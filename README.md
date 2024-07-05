from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import mysql.connector.errorcode
from werkzeug.utils import secure_filename
import os
import time

app = Flask(__name__)
CORS(app)

#Se crea clase catalogo para conectar a la base de datos
class Catalogo:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect( host=host,
        user=user,
        password=password)

        self.cursor = self.conn.cursor()

        try:
           self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
           if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
               self.cursor.execute(f"CREATE DATABASE {database}")
               self.conn.database = database

        #se crea la tabla productos, al usar "IF NOT EXISTS" se va a crear solo la primera vez y una vez creada cada vez que se instancie
        #la clase va a usar esta tabla
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS productos(
            codigo INT AUTO_INCREMENT PRIMARY KEY,
            descripcion VARCHAR(255) NOT NULL,
            cantidad INT NOT NULL,
            precio DECIMAL(10, 2) NOT NULL,
            imagen_url VARCHAR(255),
            categoria INT(4))''')
        self.conn.commit()

        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)


    #Método para acceder a todos los productos de la tabla
    def listar_productos(self):
        self.cursor.execute("SELECT * FROM productos")
        productos = self.cursor.fetchall()
        return productos

    #Método para acceder a un producto mediante su código
    def consultar_producto(self, codigo):
        self.cursor.execute(f"SELECT * FROM productos WHERE codigo = {codigo}")
        return self.cursor.fetchone()

    #Método para agregar productos
    def agregar_producto(self, descripcion, cantidad, precio, imagen, categoria):
        sql = "INSERT INTO productos (descripcion, cantidad, precio, imagen_url, categoria) VALUES(%s, %s, %s, %s, %s)"
        valores = (descripcion, cantidad, precio, imagen, categoria)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.lastrowid

    #Método para modificar productos
    def modificar_producto(self, codigo, nueva_descripcion, nueva_cantidad, nuevo_precio, nueva_imagen, nueva_categoria):
        sql = "UPDATE productos SET descripcion = %s, cantidad = %s, precio = %s, imagen_url = %s, categoria = %s WHERE codigo = %s"
        valores = (nueva_descripcion, nueva_cantidad, nuevo_precio, nueva_imagen, nueva_categoria, codigo)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0

    #Método para eliminar productos
    def eliminar_producto(self, codigo):
        self. cursor.execute(f"DELETE FROM productos WHERE codigo = {codigo}")
        self.conn.commit()
        return self.cursor.rowcount > 0

#Se crea la clase mensajes para crear y acceder a otra tabla de la misma base de datos
class Mensaje:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect( host=host,
        user=user,
        password=password,
        database = database)

        self.cursor = self.conn.cursor()

        #Se crea la tabla (solo una vez) para guardar los mensajes que manden los clientes por el formulario de contacto
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS mensajes(
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            telefono INT,
            asunto VARCHAR(255),
            comentario VARCHAR(255))''')
        self.conn.commit()

        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)

    #Método para agregar los mensajes a la base de datos
    def agregar_mensaje(self, nombre, email, telefono, asunto, msj):
        sql = "INSERT INTO mensajes (nombre, email, telefono, asunto, comentario) VALUES(%s, %s, %s, %s, %s)"
        valores = (nombre, email, telefono, asunto, msj)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.lastrowid

    #metodo para acceder a todos los mensajes
    def listar_mensajes(self):
        self.cursor.execute("SELECT * FROM mensajes")
        productos = self.cursor.fetchall()
        return productos

    #Método para eliminar mensajes
    def eliminar_mensaje(self, id):
        self. cursor.execute(f"DELETE FROM mensajes WHERE codigo = {id}")
        self.conn.commit()
        return self.cursor.rowcount > 0




catalogo = Catalogo(host='JuanjoPatti.mysql.pythonanywhere-services.com', user='JuanjoPatti', password='midatabase', database='JuanjoPatti$miapp')

ruta_destino = '/home/JuanjoPatti/mysite/static/imagenes'

mensaje = Mensaje(host='JuanjoPatti.mysql.pythonanywhere-services.com', user='JuanjoPatti', password='midatabase', database='JuanjoPatti$miapp')







#Función donde se listan todos los productos

@app.route('/productos', methods=["GET"])
def listar_productos():
    productos= catalogo.listar_productos()
    return jsonify(productos)


#Función para mostrar el producto seleccionado
@app.route('/productos/<int:codigo>', methods=["GET"])
def mostrar_producto(codigo):
    producto = catalogo.consultar_producto(codigo)
    if producto:
        return jsonify(producto), 201
    else:
        return "Producto no encontrado", 404


#Para agregar productos
@app.route("/productos", methods=["POST"])
def agregar_producto():
    descripcion = request.form['descripcion']
    catntidad = request.form['cantidad']
    precio = request.form['precio']
    imagen = request.files['imagen']
    categoria = request.form['categoria']
    nombre_imagen = ""

    #cambio del nombre de la imagen a una mas segura
    nombre_imagen = secure_filename(imagen.filename)
    nombre_base, extension = os.path.splitext(nombre_imagen)
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"

    nuevo_codigo = catalogo.agregar_producto(descripcion, catntidad, precio, nombre_imagen, categoria)
    if nuevo_codigo:
        imagen.save(os.path.join(ruta_destino, nombre_imagen))
        return jsonify({"mensaje": "producto agregado correctamente.", "codigo": nuevo_codigo, "imagen": nombre_imagen}), 201
    else:
        return jsonify({"mensaje": "Error al agregar el producto."}), 500


#Modificar un producto
@app.route('/productos/<int:codigo>', methods=["PUT"])
def modificar_producto(codigo):
    nueva_descripcion = request.form.get("descripcion")
    nueva_cantidad = request.form.get("cantidad")
    nuevo_precio = request.form.get("precio")
    nueva_categoria = request.form.get("categoria")

    #Verificación de la existencia de la nueva imagen
    if "imagen" in request.files:
        imagen = request.files['imagen']
        #se cambia el nombre de la imagen a otro mas seguro
        nombre_imagen = secure_filename(imagen.filename)
        nombre_base, extension = os.path.splitext(nombre_imagen)
        nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"

        #Se guarda la imagen en el servidor
        imagen.save(os.path.join(ruta_destino, nombre_imagen))

        #Verificacion de la existencia del producto a modificar
        producto = catalogo.consultar_producto(codigo)
        if producto:
            imagen_vieja = producto["imagen_url"]

            #Buscamos la imagen vieja
            ruta_imagen = os.path.join(ruta_destino, imagen_vieja)

            #En caso de existir la borramos
            if os.path.exists(ruta_imagen):
                os.remove(ruta_imagen)

    else:
        producto = catalogo.consultar_producto(codigo)
        if producto:
            nombre_imagen = producto["imagen_url"]

    if catalogo.modificar_producto(codigo, nueva_descripcion, nueva_cantidad, nuevo_precio, nombre_imagen, nueva_categoria):
        return jsonify({"mensaje": "Producto modificado"}), 200

    else:
        return jsonify({"mensaje": "Producto no encontrado"}), 403

#Eliminar un producto
@app.route("/productos/<codigo>", methods=['DELETE'])
def eliminar_producto(codigo):
    #primero buscamos el producto y eliminamos la imagen
    producto = catalogo.consultar_producto(codigo)

    if producto:
        ruta_imagen = os.path.join(ruta_destino, producto['imagen_url'])
        if os.path.exists(ruta_imagen):
            os.remove(ruta_imagen)


        #Ahora eliminamos el producto
        if catalogo.eliminar_producto(codigo):
            return jsonify({"mensaje": "Producto eliminado"}), 200
        else:
            return jsonify({"mensaje": "Producto no encontrado"}), 404

#---------------------------------------------------------------------------------------
#Funciones para guardar/consultar mensajes
#---------------------------------------------------------------------------------------

@app.route('/mensajes', methods=["GET"])
def listar_mensajes():
    mensajes= mensaje.listar_mensajes()
    return jsonify(mensajes)


@app.route("/mensajes", methods=["POST"])
def agregar_mensajes():
    nombre = request.form['nombre']
    email = request.form['correo']
    telefono = request.form['telefono']
    asunto = request.form['asunto']
    msj = request.form['mensaje']

    nuevo_id = mensaje.agregar_mensaje(nombre, email, telefono, asunto, msj)
    if (nuevo_id):
        return jsonify({"mensaje": "Mensaje enviado correctamente.", "codigo": nuevo_id}), 201
    else:
        return jsonify({"mensaje": "Error al enviar el mensaje."}), 501




if __name__=="__main__":
    app.run(debug=True)
