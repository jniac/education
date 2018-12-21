using UnityEngine;

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
}
