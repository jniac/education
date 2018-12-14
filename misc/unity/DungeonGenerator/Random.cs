using System.Collections.Generic;

namespace Dungeon
{
    public class Random
    {

        System.Random random;

        int m_seed;
        public int seed
        {
            get { return m_seed; }
            set { setSeed(value); }
        }

        public Random(int seed)
        {
            setSeed(seed);
        }

        public void Reset()
        {
            setSeed(m_seed);
        }

        public void setSeed(int value)
        {
            random = new System.Random(value);
            m_seed = value;
        }

        public float GetFloat()
        {
            return (float)random.Next() / (float)int.MaxValue;
        }

        public int GetInt(int max)
        {
            return random.Next() % max;
        }

        public T Among<T>(T[] array)
        {
            return array[GetInt(array.Length)];
        }

        public T Among<T>(List<T> list)
        {
            return list[GetInt(list.Count)];
        }
    }
}