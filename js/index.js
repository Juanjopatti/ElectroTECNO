
//En la variable cadNav guardamos el nav y los estilos para cargarlos luego en el html de forma dinámica mediante el id del header.
//Se uso Bootstrap en el nav con menú haburguesa y se personalizaron los estilos con css.
var cadNav = `
        <style>
        .nav-link {
            color: black;
        }

        .navbar {
            margin:auto;
        
            min-height: 40px;
            background: rgb(26, 223, 233);
             
           
           
        }
        </style>

        <nav class="navbar navbar-expand-sm">
            <div class="container-fluid">
                <a class="navbar-brand" href="./index.html"><img src="./img/logo.png" alt="Logo" width="40px"></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="index.html">Tienda</a>
                         </li>
                        <li class="nav-item">
                            <a class="nav-link" href="contacto.html">Contacto</a>
                        </li>
                       
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#"  data-bs-toggle="dropdown">
                                Categorias
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="./index.html#idTv">Smart TV</a></li>
                                <li><a class="dropdown-item" href="./index.html#idCel">Celulares</a></li>
                                <li><a class="dropdown-item" href="./index.html#idNotb">Computación</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="nosotros.html">Sobre Nosotros</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `
//Se carga el header dinámico en la etiqueta con id "idHeader"
document.getElementById('idHeader').innerHTML = cadNav;
/*-----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------*/


//En la variable cadFooter guardamos el pie de página con sus estilos para cargarlo de forma dinámica en el html mediante el id del footer.
var cadFooter = `
<style>
    .footer {
        background: #060415;
        min-height: 200px;
    }

    .footer .links_pie {
        display: flex;
        justify-content: center;
        padding: 10px;
        border-bottom: 1px solid #999999;

    }

    .footer .links_pie a {
        
        margin: 0 10px 0 10px;
        color: #999999;
        text-decoration: none;

    }

    .texto {
        
        text-align: center;
    }

    .texto p {
        color: #fff;
    }

    .texto .titulo {
        font-size: 1.7em;
    }
    .footer .redes {
        display: flex;
        justify-content: center;
        margin: 10px;
    }

    .footer .redes span i {
        color: #fff;
        margin: 10px;
        font-size: 25px;
        margin: 15px;
    }

    .footer .contacto {
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid #999999;
        padding: 10px 15% 0 15%;
        margin-top: 30px;
    }

    .footer .contacto span {
        color: #fff;
    
    
    }
    .footer .contacto span i {
        color: #999999;
        margin-right: 3px;
    }

    .footer .contacto .ubicacion i {
        color: red;
    }

    .footer .contacto .correo {
        font-size: 1.2em;
        color: aqua;
    }

    .footer .contacto .spcontac {
        font-size: 1.2em;
    }

    .copy {
        display: flex;
        align-items: center;
        justify-content: center;
        
        padding: 0 10px 0 10px;
    }

    .copy p {
        color: #999999;
    }

    .panel{
    display:block;
    }

    .copy a{
    margin-left: 15px}

    @media screen and (max-width: 768px) {
        .footer .contacto {
            flex-direction: column;
            text-align: center;
        }
        
    }

    @media screen and (max-width: 468px) {
        .footer .links_pie {
            flex-direction: column;
            text-align: center;
        }
    }
</style>

<div class="links_pie">
    <a href="#">Inicio</a>
    <a href="nosotros.html">Nosotros</a>
    <a href="contacto.html">Contacto</a>
    <a href="index.html">Tienda</a>
    
</div>
<div class="redes">
    <span><a href="redes.html" target="_blank"><i class="fa-brands fa-facebook"></i> </a></span>
    <span><a href="redes.html" target="_blank"><i class="fa-brands fa-instagram"></i></a></span>
    <span><a href="redes.html" target="_blank"><i class="fa-brands fa-x-twitter"></i></a></span>
    <span><a href="redes.html" target="_blank"><i class="fa-brands fa-youtube"></i></a></span>
    <span><a href="redes.html" target="_blank"><i class="fa-brands fa-linkedin"></i></a></span>

</div>
<div class="texto">
    <p><span class="titulo">Nuestras oficinas estan en Buenos Aires, Argentina</span><br>
    trabajamos con clientes de toda LATAM. ¡pongase en contacto con nosotros!</p>
</div>
<div class="contacto">
    <span><i class="fa-solid fa-envelope"></i><span class="correo"><b>info@correo.com</b></span></span>
    <span><i class="fa-solid fa-square-phone"></i><span class="spcontac"><b>(011)7648-4377</b></span></span>
    <span class="ubicacion"><i class="fa-solid fa-location-dot"></i><span class="spcontac"><b>AV. Siempreviva 742</b></span><br> Buenos Aires | Argentina</span>
</div>
<div class="copy">
    <p>Trabajo Práctico integrador - Codo a Codo 2024</p>
    <p class="panel"><a href="./admin/panel.html" target="_blank">Acceso al Panel </a></p>

</div>`

//Se carga el Footer de forma dinámica en la etiqueta con id "idFooter".
document.getElementById('idFooter').innerHTML = cadFooter;
/*---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------*/

/*Carrusel de Bootstarp cargado en el div con id "demo" dentro de la etiqueta "aside"*/
var cadCar = `
<!-- Indicators/dots -->
<div class="carousel-indicators">
  <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
  <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
  <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
</div>

<!-- The slideshow/carousel -->
<div class="carousel-inner">
  <div class="carousel-item active">
    <img src="./img/laptp.jpg" alt="50% Off" class="d-block" width= "90%" heigth= "400">
    <div class="carousel-caption">
      <h3>Tecnología al alcance de tu mano</h3>
      
    </div>
  </div>
  <div class="carousel-item">
    <img src="./img/smart.jpg" alt="Chicago" class="d-block">
    <div class="carousel-caption">
      <h3 class="cine">El cine en tu casa</h3>
     
    </div>
  </div>
  <div class="carousel-item">
    <img src="./img/cel.jpg" alt="New York" class="d-block">
    <div class="carousel-caption">
      <h3>Siempre conectado</h3>
     
    </div>
  </div>
</div>

<!-- Left and right controls/icons -->
<button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
  <span class="carousel-control-prev-icon"></span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
  <span class="carousel-control-next-icon"></span>
</button>
`
document.getElementById('demo').innerHTML = cadCar;

//.......................................................................
//.......................................................................
//......................................................................







if (document.getElementById('idTv')) {

    //En la variable cad se cargan los estilos css de las tarjetas para mostrar los productos.
    cad = `
    

    <style>
    
    }
    .tv {
        max-width: 1300px%;
        flex-wrap: wrap;
        display: flex;
        
        
        
        
    }
    
    .card {
        
        
        margin: 20px;
        border-radius: 6px;
        overflow: hidden;
        background: #fff;
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
        cursor: default;
        transition: all 400ms ease;
    
    }

    .card:hover {
        box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.4);
        transform: translateY(-1%);
    }
    
    .card img {
        width: 100%;
        max-height: 210px;
    }
    
    .card .contCard {
        padding: 15px;
        text-align: center;
    }
    
    .card .contCard a {
        text-decoration: none;
        border-radius: 4px;
        background: #0b1ff6;
        color: #fff;
        padding: 5px;
        transition: all 400ms ease;
        
    
    }

    .card .contCard a:hover {
        background: #3099e9;
    }
    
    .card .contCard a:active {
        background: #3a3a3a;
    }

    .valor {
        color:#000;
    }
    </style>
        <table>`

    
    cad += `
            </table>`
    //Se carga las tarjetas creadas con el bucle en la etiqueta con id "idTv"


const URL = "https://JuanjoPatti.pythonanywhere.com/"

fetch(URL + 'productos')
    .then(function(response){
        if (response.ok){
            return response.json();
        }else{
            throw new Error('Error al ontener los productos')
        }

    })
    

    .then(function(data){
        
        
        for (let producto of data){
            if (producto.categoria == '1'){
                cad += `
                        <td>
                            
                            <th><div class="card" id="card">
                
                                <figure>
                                    <img src="https://www.pythonanywhere.com/user/JuanjoPatti/files/home/JuanjoPatti/mysite/static/imagenes/${producto.imagen_url}" alt="Imagen del producto" style="width: 200px;">
                                </figure>
                                <div class="contCard">
                                    <h5> ${producto.descripcion}</h5>
                                    <p class="valor">$${producto.precio}</p>
                                    <a href="producto.html?cod=${producto.codigo}" target="_blank">Ver producto</a>
                                </div>
                            </div></th>
                        </td>`
                
            
                        cad += `
                        </table>`

                        document.getElementById('idTv').innerHTML = cad;
            }
            
        }

        var cadcel= `<table>`
        for (producto of data){
            if (producto.categoria == '2'){
            
                   cadcel += `
                            <td>
                                
                                <th><div class="card" id="card">
                    
                                    <figure>
                                         <img src="https://www.pythonanywhere.com/user/JuanjoPatti/files/home/JuanjoPatti/mysite/static/imagenes/${producto.imagen_url}" alt="Imagen del producto" style="width: 200px;">
                                    </figure>
                                    <div class="contCard">
                                        <h5> ${producto.descripcion}</h5>
                                        <p class="valor">$${producto.precio}</p>
                                        <a href="producto.html?cod=${producto.codigo}" target="_blank">Ver producto</a>
                                    </div>
                                </div></th>
                            </td>`
                    
                
                            cadcel += `
                            </table>`
    
                            document.getElementById('idCel').innerHTML = cadcel;
            }
        }  
        var cadnb = `<table>`
        for (producto of data){
            if (producto.categoria == '3'){
            
                   cadnb += `
                            <td>
                                
                                <th><div class="card" id="card">
                    
                                    <figure>
                                        <img src="https://www.pythonanywhere.com/user/JuanjoPatti/files/home/JuanjoPatti/mysite/static/imagenes/${producto.imagen_url}" alt="Imagen del producto" style="width: 200px;">
                                    </figure>
                                    <div class="contCard">
                                        <h5> ${producto.descripcion}</h5>
                                        <p class="valor">$${producto.precio}</p>
                                        <a href="producto.html?cod=${producto.codigo}" target="_blank">Ver producto</a>
                                    </div>
                                </div></th>
                            </td>`
                    
                
                            cadnb += `
                            </table>`
    
                            document.getElementById('idNotb').innerHTML = cadnb;
            }
        }      
        
               
    })


    

}
/*-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------*/


