using System;
using UnityEngine;
using System.Collections.Generic;

namespace Dungeon
{
    public static class Orientation
    {
        public const int NONE = -1;
        public const int SW = 0;
        public const int S = 1;
        public const int SE = 2;
        public const int E = 3;
        public const int NE = 4;
        public const int N = 5;
        public const int NW = 6;
        public const int W = 7;

        public static int FromXY(int x, int y)
        {
            if (x == -1 && y == -1)
                return SW;

            if (x == 0 && y == -1)
                return S;

            if (x == 1 && y == -1)
                return SE;

            if (x == 1 && y == 0)
                return E;

            if (x == 1 && y == 1)
                return NE;

            if (x == 0 && y == 1)
                return N;

            if (x == -1 && y == 1)
                return NW;

            if (x == -1 && y == 0)
                return W;

            return NONE;
        }

        /**
         * return S from SW or S, E from SE or E etc.
         */
        public static int GetUpperCardinal(int orientation)
        {
            return (orientation >> 1 << 1) + 1;
        }

        public static float CardinalToRotation(int orientation)
        {
            int cardinal = GetUpperCardinal(orientation);

            return
                cardinal == S ? 0 :
                cardinal == E ? -90 :
                cardinal == N ? 180 :
                90;
        }

        public static int FromVector(Vector2 vector)
        {
            return FromXY((int)vector.x, (int)vector.y);
        }

        public static Vector2 ToVector(int orientation)
        {
            if (orientation == SW)
                return new Vector2(-1, -1);

            if (orientation == S)
                return new Vector2(0, -1);

            if (orientation == SE)
                return new Vector2(1, -1);

            if (orientation == E)
                return new Vector2(1, 0);

            if (orientation == NE)
                return new Vector2(1, 1);

            if (orientation == N)
                return new Vector2(0, 1);

            if (orientation == NW)
                return new Vector2(-1, 1);

            if (orientation == W)
                return new Vector2(-1, 0);

            return new Vector2();
        }
    }

    public enum WallType 
    {
        NONE,

        SIMPLE_S,
        SIMPLE_E,
        SIMPLE_N,
        SIMPLE_W,

        DOUBLE_SN,
        DOUBLE_WE,

        CORNER_SW,
        CORNER_SE,
        CORNER_NW,
        CORNER_NE,

        T_SHAPE_S,
        T_SHAPE_E,
        T_SHAPE_N,
        T_SHAPE_W,
    }

    public class WallQuarter
    {
        public enum Type { SIMPLE_WALL, INNER_CORNER, OUTER_CORNER, FILLED, EMPTY, INVALID };

        public Cell cell;
        public int position;
        public int orientation;
        public Type type;
        public bool done;

        public WallQuarter(Cell cell, int position)
        {
            this.cell = cell;
            this.position = position;
        }

        public Type Compute(Room room)
        {
            Vector2 v = Orientation.ToVector(position);

            Cell cellHorz = cell.neighbors[Orientation.FromXY((int)v.x, 0)];
            Cell cellVert = cell.neighbors[Orientation.FromXY(0, (int)v.y)];
            Cell cellDiag = cell.neighbors[position];

            Room roomHorz = cellHorz == null ? null : cellHorz.room;
            Room roomVert = cellVert == null ? null : cellVert.room;
            Room roomDiag = cellDiag == null ? null : cellDiag.room;

            if (cellHorz == null || cellVert == null || cellDiag == null)
            {
                type = Type.EMPTY;
                orientation = Orientation.NONE;
            } 
            else if (roomHorz == room && roomVert == room)
            {
                type = Type.OUTER_CORNER;
                orientation = Orientation.GetUpperCardinal(position);
            }
            else if (roomHorz == null && roomVert == null)
            {
                type = roomDiag == room ? Type.INNER_CORNER : Type.FILLED;
                orientation = Orientation.GetUpperCardinal(position);
            }
            else if (roomHorz == room)
            {
                type = Type.SIMPLE_WALL;
                orientation = v.x < 0 ? Orientation.W : Orientation.E;
            }
            else if (roomVert == room)
            {
                type = Type.SIMPLE_WALL;
                orientation = v.y < 0 ? Orientation.S : Orientation.N;
            }
            else
            {
                type = Type.INVALID;
                orientation = Orientation.NONE;
            }

            done = false;

            return type;
        }
    }

    public class Cell
    {
        public int index, x, y, color;
        public Color32 pixel;
        public Cell[] neighbors = new Cell[8];

        public Room room;
        public List<Room> roomsAsWall = new List<Room>();

        public Cell(int index, int x, int y, Color32 pixel)
        {
            this.index = index;
            this.x = x;
            this.y = y;
            this.pixel = pixel;
            color = (pixel.r << 16) + (pixel.g << 8) + pixel.b;
        }

        public List<int> GetRoomDirectNeighbors(Room room)
        {
            var list = new List<int>();

            for (int i = 1; i < neighbors.Length; i += 2)
            {
                Cell cell = neighbors[i];

                if (cell != null && cell.room == room)
                    list.Add(i);
            }

            return list;
        }

        public List<int> GetRoomCornerNeighbors(Room room)
        {
            var list = new List<int>();

            for (int i = 0; i < neighbors.Length; i += 2)
            {
                Cell cell = neighbors[i];

                if (cell != null && cell.room == room)
                    list.Add(i);
            }

            return list;
        }

        public WallType ComputeWallType(Room room)
        {
            var roomDirectNeighbors = GetRoomDirectNeighbors(room);
            var roomCornerNeighbors = GetRoomCornerNeighbors(room);

            if (roomDirectNeighbors.Count == 1)
            {
                if (roomDirectNeighbors[0] == Orientation.S)
                    return WallType.SIMPLE_S;

                if (roomDirectNeighbors[0] == Orientation.E)
                    return WallType.SIMPLE_E;

                if (roomDirectNeighbors[0] == Orientation.N)
                    return WallType.SIMPLE_N;

                if (roomDirectNeighbors[0] == Orientation.W)
                    return WallType.SIMPLE_W;
            }

            if (roomDirectNeighbors.Count == 2)
            {
                int direct1 = roomDirectNeighbors[0];
                int direct2 = roomDirectNeighbors[1];

                if (direct1 == Orientation.S && direct2 == Orientation.N)
                    return WallType.DOUBLE_SN;

                if (direct1 == Orientation.E && direct2 == Orientation.W)
                    return WallType.DOUBLE_WE;
            }

            if (roomDirectNeighbors.Count == 0 && roomCornerNeighbors.Count == 1)
            {
                if (roomCornerNeighbors[0] == Orientation.SE)
                    return WallType.CORNER_SE;

                if (roomCornerNeighbors[0] == Orientation.SW)
                    return WallType.CORNER_SW;

                if (roomCornerNeighbors[0] == Orientation.NE)
                    return WallType.CORNER_NE;

                if (roomCornerNeighbors[0] == Orientation.NW)
                    return WallType.CORNER_NW;
            }

            if (roomDirectNeighbors.Count == 0 && roomCornerNeighbors.Count == 2)
            {
                int corner1 = roomCornerNeighbors[0];
                int corner2 = roomCornerNeighbors[1];

                if (corner1 == Orientation.SW && corner2 == Orientation.SE)
                    return WallType.T_SHAPE_S;

                if (corner1 == Orientation.SE && corner2 == Orientation.NE)
                    return WallType.T_SHAPE_E;

                if (corner1 == Orientation.NE && corner2 == Orientation.NW)
                    return WallType.T_SHAPE_N;

                if (corner1 == Orientation.SW && corner2 == Orientation.NW)
                    return WallType.T_SHAPE_W;
            }

            return WallType.NONE;
        }

        public Cell SW
        {
            get { return neighbors[Orientation.SW]; }
            set { neighbors[Orientation.SW] = value; }
        }

        public Cell S
        {
            get { return neighbors[Orientation.S]; }
            set { neighbors[Orientation.S] = value; }
        }

        public Cell SE
        {
            get { return neighbors[Orientation.SE]; }
            set { neighbors[Orientation.SE] = value; }
        }

        public Cell E
        {
            get { return neighbors[Orientation.E]; }
            set { neighbors[Orientation.E] = value; }
        }

        public Cell NE
        {
            get { return neighbors[Orientation.NE]; }
            set { neighbors[Orientation.NE] = value; }
        }

        public Cell N
        {
            get { return neighbors[Orientation.N]; }
            set { neighbors[Orientation.N] = value; }
        }

        public Cell NW
        {
            get { return neighbors[Orientation.NW]; }
            set { neighbors[Orientation.NW] = value; }
        }

        public Cell W
        {
            get { return neighbors[Orientation.W]; }
            set { neighbors[Orientation.W] = value; }
        }

        public WallQuarter[] wallQuarters;
        public void ComputeWallQuartersFor(Room room)
        {
            if (wallQuarters == null)
                wallQuarters = new WallQuarter[] {
                    new WallQuarter(this, Orientation.SW),
                    new WallQuarter(this, Orientation.SE),
                    new WallQuarter(this, Orientation.NE),
                    new WallQuarter(this, Orientation.NW),
                };

            foreach (var quarter in wallQuarters)
            {
                quarter.Compute(room);
            }
        }

        public int quarterSW = -1;
        public int quarterSE = -1;
        public int quarterNE = -1;
        public int quarterNW = -1;
        public void ComputeWallQuarters()
        {

            bool wallS = S != null && S.room == null;
            bool wallE = E != null && E.room == null;
            bool wallN = N != null && N.room == null;
            bool wallW = W != null && W.room == null;

            quarterSW =
                !wallS && !wallW ? Orientation.SW :
                !wallS && wallW ? Orientation.S :
                wallS && !wallW ? Orientation.W :
                -1;

            quarterSE =
                !wallS && !wallE ? Orientation.SE :
                !wallS && wallE ? Orientation.S :
                wallS && !wallE ? Orientation.E :
                -1;

            quarterNE =
                !wallN && !wallE ? Orientation.NE :
                !wallN && wallE ? Orientation.N :
                wallN && !wallE ? Orientation.E :
                -1;

            quarterNW =
                !wallN && !wallW ? Orientation.NW :
                !wallN && wallW ? Orientation.N :
                wallN && !wallW ? Orientation.W :
                -1;
        }

        public override string ToString()
        {
            return "Cell#" + index + " (" + x + ", " + y + ")";
        }
    }
}
