using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ClonerRadialOp : Cloner.Op {

	public Cloner.Axis axe = Cloner.Axis.Y;

	public float radius = 2f;

	public float angleFrom = 0;
	public float angleTo = 360;

	public override Vector3 GetPosition (Vector3 referer, float i) {

		float angle = 2f * Mathf.PI * i / n;

		if (axe == Cloner.Axis.X)
			return referer + new Vector3(0, radius * Mathf.Cos(angle), radius * Mathf.Sin(angle));

		if (axe == Cloner.Axis.Y)
			return referer + new Vector3(radius * Mathf.Cos(angle), 0, radius * Mathf.Sin(angle));

		return referer + new Vector3(radius * Mathf.Cos(angle), radius * Mathf.Sin(angle), 0);

	}

	public override Cloner.PSR GetPSR (Cloner.PSR referer, float i) {

		float angle = 2f * Mathf.PI * i / n;

		if (axe == Cloner.Axis.X) {

			referer.position += referer.rotation * new Vector3(0, radius * Mathf.Cos(angle), radius * Mathf.Sin(angle));
			referer.rotation *= Quaternion.Euler (360f * i / n, 0, 0);

		}

		if (axe == Cloner.Axis.Y) {

			referer.position += referer.rotation * new Vector3(radius * Mathf.Cos(angle), 0, radius * Mathf.Sin(angle));
			referer.rotation *= Quaternion.Euler (0, -360f * i / n, 0);

		}

		if (axe == Cloner.Axis.Z) {

			referer.position += referer.rotation * new Vector3(radius * Mathf.Cos(angle), radius * Mathf.Sin(angle), 0);
			referer.rotation *= Quaternion.Euler (0, 0, 360f * i / n);

		}

		return referer;

	}

}
