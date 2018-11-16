using System.Collections;
using System.Collections.Generic;
using UnityEngine;












[ExecuteInEditMode]
public class Cloner : MonoBehaviour {

	// IN THE NAMESPACE:
	
	public enum Axis {
		X, Y, Z,
	}

	public enum SourceMode {
		Iterate, 
		Random, 
	}

	public struct PSR {

		public Vector3 position;
		public Vector3 scale;
		public Quaternion rotation;

		public static PSR identity {

			get {
				
				PSR psr = new PSR();

				psr.scale = Vector3.one;
				psr.rotation = Quaternion.identity;

				return psr;

			}

		}

		public static PSR from(Transform tr, bool global = true) {

			PSR psr = new PSR();
			psr.position = global ? tr.position : tr.localPosition;
			psr.scale = global ? tr.lossyScale : tr.localScale;
			psr.rotation = global ? tr.rotation : tr.localRotation;

			return psr;

		}

		public static PSR from(GameObject go, bool global = true) {

			return PSR.from (go.transform, global);

		}

		public static PSR mix(PSR a, PSR b, float t) {

			PSR psr = new PSR();
			psr.position = Vector3.Lerp (a.position, b.position, t);
			psr.scale = Vector3.Lerp (a.scale, b.scale, t);
			psr.rotation = Quaternion.Slerp (a.rotation, b.rotation, t);

			return psr;

		}

		public static PSR mixIdentity(PSR a, float t) {

			PSR psr = new PSR();
			psr.position = a.position * (1f - t);
			psr.scale = a.scale * (1f - t);
			psr.rotation = Quaternion.Slerp (a.rotation, Quaternion.identity, t);

			return psr;

		}

	}



	public class Op : MonoBehaviour {

		public new bool enabled = true;

		public float n = 3;

		void OnValidate() {

			n = Mathf.Max (n, 1f);

		}

		virtual public Vector3 GetPosition(Vector3 referer, float i) {

			return referer;

		}

		virtual public PSR GetPSR(PSR referer, float i) {

			return referer;

		}

	}





	public class ClonerRandom {

		System.Random random;

		int m_seed;

		public int seed {
			get { return m_seed; }
			set { setSeed(value); }
		}

		public ClonerRandom(int seed) {

			setSeed (seed);

		}

		public void Reset() {

			setSeed (m_seed);

		}

		public void setSeed(int value) {

			random = new System.Random (value);

			m_seed = value;

		}

		public float GetFloat() {

			return (float)random.Next () / (float)int.MaxValue;

		}

		public int GetInt(int max) {

			return random.Next () % max;

		}

		public T InArray<T>(T[] array) {

			return array [GetInt (array.Length)];

		}

		public T InList<T>(List<T> list) {

			return list [GetInt (list.Count)];

		}

	}









	// THE CLASS:

	[Header("Sources")]

	public List<GameObject> sources = new List<GameObject> ();
	List<PSR> sourcesPSR = new List<PSR>();

	public SourceMode sourceMode = SourceMode.Iterate;

	public int randomSeed = 12345;

	ClonerRandom random = new ClonerRandom (12345);

	// [Range(0, 1)]
	// TODO: fix source PSR interpolation (not so simple to be performant wise)
	// public float sourcePSR = 0;

	[Header("Clones")]

	public Vector3 cloneShiftPosition = new Vector3();
	public Vector3 cloneRotation = new Vector3 ();
	public float cloneScale = 1;
	public Vector3 cloneScaleXYZ = Vector3.one;

	// Vector3[] positions;
	PSR[] positions;

	GameObject[] clones = new GameObject[0];
	GameObject[] clonesSourceRef = new GameObject[0];

	// Use this for initialization
	void Start () {



	}

	void UpdatePositions() {

		List<Op> ops = new List<Op>(GetComponents<Op> ());

		ops.RemoveAll (linearOp => !linearOp.enabled);

		n = 1f;

		foreach (var linearOp in ops) {

			n *= Mathf.Floor (linearOp.n);

		}

		int count = 1;
		// positions = new Vector3[(int)n];
		positions = new PSR[(int)n];
		positions[0] = PSR.identity;

		// Vector3 referer;
		PSR referer;

		foreach (var op in ops) {

			for (int j = 0; j < count; j++) {

				referer = positions [j];

				for (int i = 0, opN = (int)op.n; i < opN; i++) {

					// positions [i * count + j] = op.GetPosition (referer, (float)i);
					positions [i * count + j] = op.GetPSR (referer, (float)i);

				}

			}

			count *= (int)Mathf.Max (op.n, 1f);

		}

	}




	static GameObject defaultSource;
	GameObject GetSource(int i) {

		if (!defaultSource) {
			
			defaultSource = new GameObject ("Cloner Default Source");
			defaultSource.transform.parent = transform;

		}

		if (sources.Count == 0)
			return defaultSource;

		if (sourceMode == SourceMode.Iterate)
			return sources [i % sources.Count];

		if (sourceMode == SourceMode.Random)
			return random.InList (sources);

		return defaultSource;

	}

	[Header("Force Update Clones (trigger)")]

	public bool forceUpdateClones = false;
	SourceMode lastSourceMode;
	void UpdateClones() {

		if (lastSourceMode != sourceMode) {
			lastSourceMode = sourceMode;
			forceUpdateClones = true;
		}

		if (clones.Length == (int)n && !forceUpdateClones)
			return;

		sources.RemoveAll (source => source == null);

		for (int i = transform.childCount - 1; i >= 0; i--)
			DestroyImmediate (transform.GetChild (i).gameObject);

		sourcesPSR.Clear ();
		foreach (var source in sources)
			sourcesPSR.Add (PSR.from (source));

		clones = new GameObject[(int)n];
		clonesSourceRef = new GameObject[(int)n];

		for (int i = 0; i < n; i++) {

			GameObject source = GetSource (i);
			clonesSourceRef [i] = source;
			clones [i] = Instantiate (source);
			clones [i].transform.SetParent (transform);

		}

		forceUpdateClones = false;

	}





	void UpdateClonesPosition() {

		for (int i = 0; i < n; i++) {

			GameObject source = clonesSourceRef [i];

			clones [i].transform.position = transform.TransformPoint (positions [i].position) + cloneShiftPosition;
			clones [i].transform.rotation = source.transform.rotation * transform.rotation * positions [i].rotation * Quaternion.Euler(cloneRotation);
			clones [i].transform.localScale = Vector3.Scale(source.transform.localScale, Vector3.Scale(transform.localScale, cloneScaleXYZ) * cloneScale);

		}

	}



	// Update is called once per frame
	void Update () {

        // Do NOT update in runtime, only in edition
        if (!Application.isPlaying) {

			if (random.seed != randomSeed) {
				random.seed = randomSeed;
				forceUpdateClones = true;
			}

			random.Reset ();

			UpdatePositions ();
			UpdateClones ();
			UpdateClonesPosition ();

		}

	}

	[Header("Number Of Clones (readonly)")]

	public float n;

}
