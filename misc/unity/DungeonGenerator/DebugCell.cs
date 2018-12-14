using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DebugCell : MonoBehaviour
{
    public float size = 1f;
    public float joint = .02f;
    public Color color = Color.red;
    public bool wire = false;

    private void OnDrawGizmos()
    {
        Gizmos.color = color;

        if (wire)
        {
            Gizmos.DrawWireCube(transform.position, new Vector3(size, 0, size));
        }
        else
        {
            Gizmos.DrawCube(transform.position, new Vector3(size - joint, 0, size - joint));
        }
    }
}
