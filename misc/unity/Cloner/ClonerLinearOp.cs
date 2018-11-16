using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ClonerLinearOp : Cloner.Op {

	public Vector3 step = new Vector3(1, 0, 0);

	[Range(-1, 1)]
	public float offset = 0f;

	public override Vector3 GetPosition (Vector3 referer, float i) {
		
		return referer + step * i - step * (n - 1) * (offset * 0.5f + 0.5f);

	}

	public override Cloner.PSR GetPSR (Cloner.PSR referer, float i) {

		referer.position += (referer.rotation * step) * (i - (n - 1) * (offset * 0.5f + 0.5f));

		return referer;

	}

}
