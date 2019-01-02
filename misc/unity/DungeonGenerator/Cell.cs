using System;
using UnityEngine;
using System.Collections.Generic;

namespace Dungeon
{
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
        public Color pixel;
        public Cell[] neighbors = new Cell[8];

        public Room room;
        public List<Room> adjacentRooms = new List<Room>();

        public List<GameObject> tiles = new List<GameObject>();

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

        public int quarterSW = Orientation.NONE;
        public int quarterSE = Orientation.NONE;
        public int quarterNE = Orientation.NONE;
        public int quarterNW = Orientation.NONE;
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
                Orientation.NONE;

            quarterSE =
                !wallS && !wallE ? Orientation.SE :
                !wallS && wallE ? Orientation.S :
                wallS && !wallE ? Orientation.E :
                Orientation.NONE;

            quarterNE =
                !wallN && !wallE ? Orientation.NE :
                !wallN && wallE ? Orientation.N :
                wallN && !wallE ? Orientation.E :
                Orientation.NONE;

            quarterNW =
                !wallN && !wallW ? Orientation.NW :
                !wallN && wallW ? Orientation.N :
                wallN && !wallW ? Orientation.W :
                Orientation.NONE;
        }

        public override string ToString()
        {
            return "Cell#" + index + " (" + x + ", " + y + ")";
        }
    }
}
