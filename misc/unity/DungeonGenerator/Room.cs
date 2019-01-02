using System.Collections.Generic;
using UnityEngine;

namespace Dungeon
{
    public class Room
    {
        public List<Cell> cells = new List<Cell>();
        public List<Cell> walls = new List<Cell>();

        public readonly int index;

        public Room(int index)
        {
            this.index = index;
        }

        private void AddCellAsFloor(Cell cell)
        {
            cell.room = this;
            cells.Add(cell);
        }

        private void AddCellAsWall(Cell cell)
        {
            if (cell.adjacentRooms.Contains(this))
                return;

            cell.adjacentRooms.Add(this);
            walls.Add(cell);
        }

        public void ExpandFrom(Cell source, List<Color> roomColors)
        {
            AddCellAsFloor(source);

            Queue<Cell> queue = new Queue<Cell>();
            queue.Enqueue(source);

            while (queue.Count > 0)
            {
                Cell cell = queue.Dequeue();

                foreach (Cell neighbor in cell.neighbors)
                {
                    if (neighbor == null)
                        continue;

                    if (neighbor.room != null) // ignore cell which are already in a room
                        continue;

                    if (roomColors.Contains(neighbor.pixel))
                    {
                        queue.Enqueue(neighbor);
                        AddCellAsFloor(neighbor);
                    }
                    else
                    {
                        AddCellAsWall(neighbor);
                    }
                }
            }
        }

        public override string ToString()
        {
            return string.Format("Room#{0} cells:{1}, walls:{2}", this.index, cells.Count, walls.Count);
        }
    }
}
