using System.Collections.Generic;
using UnityEngine;

namespace Dungeon
{
    public class Dungeon
    {
        public Texture2D map;
        public Random random = new Random(12345);
        public Cell[] cells;
        public List<Room> rooms = new List<Room>();

        public Dungeon(int randomSeed = 12345)
        {
            random.setSeed(randomSeed);
        }

        public Cell GetCell(int x, int y)
        {
            int width = map.width;
            return cells[width * y + x];
        }

        private void CreateCells()
        {
            Color32[] pixels = map.GetPixels32();
            cells = new Cell[pixels.Length];

            int width = map.width;
            int index = 0;
            foreach (Color32 pixel in pixels)
            {

                int x = index % width;
                int y = index / width;

                Cell cell = new Cell(index, x, y, pixel);
                cells[index] = cell;

                if (y > 0)
                {
                    Cell S = cells[(y - 1) * width + x];
                    cell.S = S;
                    S.N = cell;

                    if (x > 0)
                    {
                        Cell SW = cells[(y - 1) * width + x - 1];
                        cell.SW = SW;
                        SW.NE = cell;
                    }

                    if (x < width - 1)
                    {
                        Cell SE = cells[(y - 1) * width + x + 1];
                        cell.SE = SE;
                        SE.NW = cell;
                    }
                }

                if (x > 0)
                {
                    Cell W = cells[y * width + x - 1];
                    cell.W = W;
                    W.E = cell;
                }

                index++;
            }
        }

        private void CreateRooms(List<Color> roomColors)
        {
            foreach (Cell cell in cells)
            {
                if (cell.room != null)
                    continue;

                if (roomColors.Contains(cell.pixel))
                {
                    Room room = new Room(rooms.Count);
                    room.ExpandFrom(cell, roomColors);
                    rooms.Add(room);
                }
            }
        }

        public void Init(Texture2D map, List<Color> roomColors)
        {
            this.map = map;

            CreateCells();
            CreateRooms(roomColors);
        }
    }
}
