using System;
using System.Collections.Generic;
using UnityEngine;
using Dungeon;

[ExecuteInEditMode]
public class DungeonGenerator : MonoBehaviour
{
    public Texture2D map;
    public int randomSeed = 12345;
    public Color roomColor = new Color(0x99 / 0xff, 0x99 / 0xff, 0x99 / 0xff);
    public Color wallColor = Color.black;
    public List<GameObject> floorTiles = new List<GameObject>();
    public bool randomRotateFloorTiles = true;
    public List<GameObject> simpleWalls = new List<GameObject>();
    public List<GameObject> halfWalls = new List<GameObject>();
    public List<GameObject> cornerWalls = new List<GameObject>();
    public List<GameObject> outerCornerWalls = new List<GameObject>();
    public bool hideTilesInHierarchy = true;

    public Dungeon.Dungeon dungeon;

    void Clear()
    {
        while (transform.childCount > 0)
            DestroyImmediate(transform.GetChild(0).gameObject);
    }

    GameObject CreateDebugTile(Cell cell, Color color = default)
    {
        GameObject tile = new GameObject();
        tile.transform.parent = transform;
        tile.transform.localPosition = new Vector3(cell.x, 0, cell.y);
        tile.transform.localRotation = Quaternion.identity;
        tile.name = string.Format("({0},{1})", cell.x, cell.y);

        DebugCell debugCell = tile.AddComponent<DebugCell>();

        if (color != default)
            debugCell.color = color;

        return tile;
    }

    void Create(Cell cell, float dx = 0, float dy = 0, float rotationY = 0, List<GameObject> list = null, bool hide = true, Color debugColor = default)
    {
        GameObject tile;

        if (list == null || list.Count == 0)
        {
            CreateDebugTile(cell, debugColor);
            return;
        }

        GameObject source = dungeon.random.Among(list);

        if (source == null)
        {
            CreateDebugTile(cell, debugColor);
            return;
        }

        tile = Instantiate(source, transform);
        tile.transform.localPosition = new Vector3(cell.x + dx, 0, cell.y + dy);
        tile.transform.localRotation = Quaternion.Euler(0, rotationY, 0);

        if (hideTilesInHierarchy && hide)
            tile.hideFlags = HideFlags.HideInHierarchy;
    }

    void Update()
    {
        if (Application.isPlaying)
            return;

        if (!map)
            return;

        Clear();

        dungeon = new Dungeon.Dungeon(randomSeed);

        DungeonMapPixel[] mapPixels = GetComponents<DungeonMapPixel>();
        DungeonMapPixel[] wallMapPixels = Array.FindAll(mapPixels, mapPixel => mapPixel.isWall == true);
        DungeonMapPixel[] roomMapPixels = Array.FindAll(mapPixels, mapPixel => mapPixel.isWall == false);

        List<Color> roomColors = new List<Color>(Array.ConvertAll(roomMapPixels, mapPixel => mapPixel.pixelColor)) { roomColor };
        List<Color> wallColors = new List<Color>(Array.ConvertAll(wallMapPixels, mapPixel => mapPixel.pixelColor)) { wallColor };

        dungeon.Init(map, roomColors);

        foreach (Room room in dungeon.rooms)
        {
            // ROOM
            foreach(Cell cell in room.cells)
            {
                List<GameObject> currentRoomMapPixels = new List<GameObject>(Array.ConvertAll(
                    Array.FindAll(wallMapPixels, mapPixel => mapPixel.pixelColor == cell.pixel),
                    mapPixel => mapPixel.prefab));

                if (currentRoomMapPixels.Count > 0)
                {
                    Create(cell, 0, 0, 0, currentRoomMapPixels, debugColor: Color.blue);
                }
                else
                {
                    float rotateY = randomRotateFloorTiles ? 90f * dungeon.random.GetInt(4) : 0;

                    Create(cell, 0, 0, rotateY, floorTiles, debugColor: Color.blue);
                }
            }

            // WALLS
            foreach(Cell cell in room.walls)
            {
                cell.ComputeWallQuartersFor(room);

                List<GameObject> currentWallMapPixels = new List<GameObject>(Array.ConvertAll(
                    Array.FindAll(wallMapPixels, mapPixel => mapPixel.pixelColor == cell.pixel), 
                    mapPixel => mapPixel.prefab));
                    
                if (currentWallMapPixels.Count > 0)
                {
                    float rotationY = 0;

                    if (cell.W != null && cell.E != null && cell.W.room != null && cell.E.room != null)
                        rotationY = 90;

                    Create(cell, 0, 0, rotationY, currentWallMapPixels);

                    continue;
                }

                // DOUBLE LOOKUP
                for (int index = 0; index < 4; index++)
                {
                    var quarter = cell.wallQuarters[index];
                    var previousQuarter = cell.wallQuarters[index == 0 ? 3 : index - 1];

                    bool bothAreSimpleWall = previousQuarter.type == WallQuarter.Type.SIMPLE_WALL && quarter.type == WallQuarter.Type.SIMPLE_WALL;
                    bool bothHaveSameOrientation = previousQuarter.orientation == quarter.orientation;

                    if (bothAreSimpleWall && bothHaveSameOrientation)
                    {
                        if (quarter.orientation == Orientation.S)
                        {
                            Create(cell, 0, -.25f, 0, simpleWalls);
                        }
                        else if (quarter.orientation == Orientation.E)
                        {
                            Create(cell, .25f, 0, -90, simpleWalls);
                        }
                        else if (quarter.orientation == Orientation.N)
                        {
                            Create(cell, 0, .25f, 180, simpleWalls);
                        }
                        else if (quarter.orientation == Orientation.W)
                        {
                            Create(cell, -.25f, 0, 90, simpleWalls);
                        }

                        previousQuarter.done = true;
                        quarter.done = true;
                    }
                }

                // REGULAR LOOP
                for (int index = 0; index < 4; index++)
                {
                    var quarter = cell.wallQuarters[index];
                    var v = Orientation.ToVector(quarter.position);
                    float dx = .25f * v.x;
                    float dy = .25f * v.y;

                    if (quarter.done)
                        continue;

                    if (quarter.type == WallQuarter.Type.INNER_CORNER)
                    {
                        Create(cell, dx, dy, 90 * -index, cornerWalls);
                    }
                    else if (quarter.type == WallQuarter.Type.OUTER_CORNER)
                    {
                        Create(cell, dx, dy, 90 * (-index + 1), outerCornerWalls);
                    }
                    else if (quarter.type == WallQuarter.Type.SIMPLE_WALL)
                    {
                        Create(cell, dx, dy, Orientation.CardinalToRotation(quarter.orientation), halfWalls);
                    }
                }
            }
        }
    }
}
