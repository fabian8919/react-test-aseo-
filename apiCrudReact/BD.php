<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

/**
 * 
 */
class ApiRest
{
	
	public function __construct()
	{
		$servidor = "localhost"; $usuario = "postgres"; $contrasenia = "admin*postgres1234"; $dbname = "latiendaweb";
		$this->conexionBD = pg_connect("host={$servidor} dbname={$dbname} user={$usuario} password={$contrasenia}");
	}

	public function SetParam($param)
	{
		$this->param = $param;
	}

	public function Autores()
	{	
		$sql = pg_query($this->conexionBD,"SELECT * FROM autores ");
		if(pg_num_rows($sql) > 0){
		    $select = pg_fetch_all($sql);
		    echo json_encode($select);
		}else{ echo json_encode(false); }
	}

	public function ExtraerAutor()
	{
		$data = json_decode(file_get_contents("php://input"));
	    $id=$data->id;
	    $sql = pg_query($this->conexionBD,"SELECT * FROM autores WHERE id_autor = {$id}");
	   	if(pg_num_rows($sql) > 0){
		    $select = pg_fetch_all($sql);
		    echo json_encode($select);
		}else{ echo json_encode(false); }
	}

	public function insertarAutor()
	{
		$data = json_decode(file_get_contents("php://input"));
        $array = array('nombre' => $data->nombre);        
        $insert = pg_insert($this->conexionBD, 'autores', $array);
		if($insert){
	    	echo json_encode(true);
	    }else{
	    	echo json_encode(true);
	    }
	    exit();
	}

	public function eliminarAutor()
	{
		$data = json_decode(file_get_contents("php://input"));
	    $id=$data->id;
	    $sql = pg_query($this->conexionBD,"DELETE FROM autores WHERE id_autor = {$id}");
	   	echo json_encode(true);
	}

	public function EditarAutor()
	{
		$data = json_decode(file_get_contents("php://input"));
	    $id=$data->id;
	    $nombre=$data->nombre;
	    $sql = pg_query($this->conexionBD,"UPDATE autores SET nombre = '$nombre' WHERE id_autor = {$id}");
	    if(pg_affected_rows($sql)){
	   		echo json_encode(true);
	    }else{
	   		echo json_encode(false);
	    }
	}

	public function Categoria()
	{	
		$sql = pg_query($this->conexionBD,"SELECT * FROM categorias ");
		if(pg_num_rows($sql) > 0){
		    $select = pg_fetch_all($sql);
		    echo json_encode($select);
		}else{ echo json_encode(false); }
	}

	public function ExtraerCategoria()
	{
		$data = json_decode(file_get_contents("php://input"));
	    $id=$data->id;
	    $sql = pg_query($this->conexionBD,"SELECT * FROM categorias WHERE id_categoria = {$id}");
	   	if(pg_num_rows($sql) > 0){
		    $select = pg_fetch_all($sql);
		    echo json_encode($select);
		}else{ echo json_encode(false); }
	}

	public function insertarCategoria()
	{
		$data = json_decode(file_get_contents("php://input"));
        
        $array = array('nombre' => $data->nombre);       
        
        $insert = pg_insert($this->conexionBD, 'categorias', $array);
		if($insert){
	    	echo json_encode(true);
	    }else{
	    	echo json_encode(true);
	    }
	    
	    exit();
	}

	public function eliminarCategoria()
	{
		$data = json_decode(file_get_contents("php://input"));
	    $id=$data->id;
	    $sql = pg_query($this->conexionBD,"DELETE FROM categorias WHERE id_categoria = {$id}");
	   	echo json_encode(true);
	}

	public function EditarCategoria()
	{
		$data = json_decode(file_get_contents("php://input"));
	    $id=$data->id;
	    $nombre=$data->nombre;
	    $sql = pg_query($this->conexionBD,"UPDATE categorias SET nombre = '$nombre' WHERE id_categoria = {$id}");
	    if(pg_affected_rows($sql)){
	   		echo json_encode(true);
	    }else{
	   		echo json_encode(false);
	    }
	}

	public function Peliculas()
	{	
		$sql = pg_query($this->conexionBD,"SELECT id_pelicula, peliculas.nombre as nombre_peli, autores.nombre as nombre_autor, categorias.nombre as nombre_cate, fecha_lanzamiento, productora
			FROM peliculas 
			INNER JOIN autores ON autores.id_autor = peliculas.id_autor
			INNER JOIN categorias ON categorias.id_categoria = peliculas.id_categoria");
		if(pg_num_rows($sql) > 0){
		    $select = pg_fetch_all($sql);
		    echo json_encode($select);
		}else{ echo json_encode(false); }
	}

	public function ExtraerPelicula()
	{
		$data = json_decode(file_get_contents("php://input"));
	    $id=$data->id;
	    $sql = pg_query($this->conexionBD,"SELECT * FROM peliculas WHERE id_pelicula = {$id}");
	   	if(pg_num_rows($sql) > 0){
		    $select = pg_fetch_all($sql);
		    echo json_encode($select);
		}else{ echo json_encode(false); }
	}

	public function eliminarPelicula()
	{
		$data = json_decode(file_get_contents("php://input"));
	    $id=$data->id;
	    $sql = pg_query($this->conexionBD,"DELETE FROM peliculas WHERE id_pelicula = {$id}");
	   	echo json_encode(true);
	}

	public function insertarPelicula()
	{
		$data = json_decode(file_get_contents("php://input"));


    	$array = array(
    		'nombre' => $data->nombre,
	        'id_autor' => $data->id_autor,
	        'id_categoria' => $data->id_categoria,
	        'fecha_lanzamiento' => $data->fecha_lanzamiento,
	        'productora' => $data->productora
    	);   

    	$insert = pg_insert($this->conexionBD, 'peliculas', $array);
	    
	    if($insert){
	    	echo json_encode(true);
	    }else{
	    	echo json_encode(true);
	    }

	    exit();
	}

	public function EditarPelicula()
	{
		$data = json_decode(file_get_contents("php://input"));
	    $id=$data->id_pelicula;
	    $nombre = $data->nombre;
	    $id_autor = $data->id_autor;
	    $id_categoria = $data->id_categoria;
	    $fecha_lanzamiento = $data->fecha_lanzamiento;
	    $productora = $data->productora;	    

	    $sql = pg_query($this->conexionBD,"UPDATE peliculas SET nombre = '$nombre', 
	    	id_autor = {$id_autor}, id_categoria = {$id_categoria}, fecha_lanzamiento = '$fecha_lanzamiento',
	    	productora = '$productora'
	    	WHERE id_pelicula = {$id}");
	    if(pg_affected_rows($sql)){
	   		echo json_encode(true);
	    }else{
	   		echo json_encode(false);
	    }
	}

	public function Main()
	{	
		switch (key($this->param)) {
			case 'Autores':
				$this->Autores();
			break;

			case 'ExtraerAutor':
				$this->ExtraerAutor();
			break;

			case 'insertarAutor':
				$this->insertarAutor();
			break;

			case 'eliminarAutor':
				$this->eliminarAutor();
			break;

			case 'EditarAutor':
				$this->EditarAutor();
			break;

			case 'Categoria':
				$this->Categoria();
			break;

			case 'ExtraerCategoria':
				$this->ExtraerCategoria();
			break;

			case 'insertarCategoria':
				$this->insertarCategoria();
			break;

			case 'eliminarCategoria':
				$this->eliminarCategoria();
			break;

			case 'EditarCategoria':
				$this->EditarCategoria();
			break;

			case 'Peliculas':
				$this->Peliculas();
			break;

			case 'ExtraerPelicula':
				$this->ExtraerPelicula();
			break;

			case 'eliminarPelicula':
				$this->eliminarPelicula();
			break;

			case 'insertarPelicula':
				$this->insertarPelicula();
			break;

			case 'EditarPelicula':
				$this->EditarPelicula();
			break;
			
			default:
				echo json_encode([["success"=>0]]);
			break;
		}
	}
}

$ApiRest = new ApiRest();
$ApiRest->SetParam($_GET);
$ApiRest->Main();
// Conecta a la base de datos  con usuario, contraseña y nombre de la BD



// if (isset($_GET["consultar"])){
//     $sqlEmpleaados = mysqli_query($conexionBD,"SELECT * FROM empleados WHERE id=".$_GET["consultar"]);
//     if(mysqli_num_rows($sqlEmpleaados) > 0){
//         $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
//         echo json_encode($empleaados);
//         exit();
//     }
//     else{  echo json_encode(["success"=>0]); }
// }

// if (isset($_GET["borrar"])){
//     $sqlEmpleaados = mysqli_query($conexionBD,"DELETE FROM empleados WHERE id=".$_GET["borrar"]);
//     if($sqlEmpleaados){
//         echo json_encode(["success"=>1]);
//         exit();
//     }
//     else{  echo json_encode(["success"=>0]); }
// }

// if(isset($_GET["insertar"])){
//     $data = json_decode(file_get_contents("php://input"));
//     $nombre=$data->nombre;
//     $correo=$data->correo;
//         if(($correo!="")&&($nombre!="")){
            
//     $sqlEmpleaados = mysqli_query($conexionBD,"INSERT INTO empleados(nombre,correo) VALUES('$nombre','$correo') ");
//     echo json_encode(["success"=>1]);
//         }
//     exit();
// }

// if(isset($_GET["actualizar"])){
    
//     $data = json_decode(file_get_contents("php://input"));

//     $id=(isset($data->id))?$data->id:$_GET["actualizar"];
//     $nombre=$data->nombre;
//     $correo=$data->correo;
    
//     $sqlEmpleaados = mysqli_query($conexionBD,"UPDATE empleados SET nombre='$nombre',correo='$correo' WHERE id='$id'");
//     echo json_encode(["success"=>1]);
//     exit();
// }


?>