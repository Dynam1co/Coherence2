using UnityEngine;
using System.Collections;

public class ObjetosCercanos : MonoBehaviour {

    [SerializeField] float LejaniaObjetos = 2;
    string objetos = "";

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
        BuscarObjetos(this.transform.position, LejaniaObjetos);
	}

    void OnGUI()
    {
        GUI.Label(new Rect(10, 10, 500, 20), "Encontrados " + objetos);
    }

    void BuscarObjetos(Vector3 center, float radius)
    {
        Collider[] objEncontrados = Physics.OverlapSphere(center, radius);
        int i = 0;
        objetos = "";
        while (i < objEncontrados.Length)
        {
            Debug.Log(objEncontrados[i].name.ToString());
            objetos = objetos + " " + objEncontrados[i].name.ToString();
            i++;
        }
    }
}
