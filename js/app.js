class Producto {

    constructor(nombre, precio, year) {
        this.nombre = nombre;
        this.precio = precio;
        this.year = year;
    }

}

class Interface {
    addProducto(producto) {
        const listaProductos = document.getElementById('lista-pro');
        const elemento = document.createElement('div');
        elemento.innerHTML = ` 
        <div class="card  text-center mb-4 p-4">
        <div class="bard-body ">
        <p class="font-weight-bold d-inline">Nombre: ${producto.nombre} </p>
        <p class="font-weight-bold d-inline">Precio: ${producto.precio} </p>
        <p class="font-weight-bold d-inline">Fecha vencimiento: ${producto.year} </p>
        <a href="#" class="btn btn-outline-danger btn-sm mx-2" name="delete">Eliminar</a>
        </div>
        </div>
        `;

        listaProductos.appendChild(elemento);
        this.resetForm();
        this.inputMouse();

    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProcucto(elemento) {
        if (elemento.name === 'delete') {
            //se escoge el contenedor padre
            elemento.parentElement.parentElement.parentElement.remove();
            this.showMensaje('Producto eliminado', 'danger');
            this.inputMouse();
        }
    }

    showMensaje(mensaje, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} d-block`;
        div.appendChild(document.createTextNode(mensaje));
        //mostrar en el DOM el mnsajes
        const contenedor = document.querySelector('.container');
        const app = document.querySelector('#App');
        contenedor.insertBefore(div, app);


        setTimeout(function() {
            document.querySelector('.alert').remove();

        }, 1000)
    }



    //puntero en input
    inputMouse() {
        document.getElementById('nombre').focus();
    }
}

//DOM
document.getElementById('product-form')
    .addEventListener('submit', function(e) {

        const nombreProducto = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;
        const year = document.getElementById('year').value;


        const producto = new Producto(nombreProducto, precio, year);
        const ui = new Interface();


        if (nombreProducto === '' || precio === '' || year === '') {
            ui.showMensaje('Completa los campos por favor!', 'warning')
        } else {
            ui.addProducto(producto);
            ui.showMensaje(`Exito!`, 'success')

        }



        // cancelar reload al pulsar boton
        e.preventDefault();
    });

document.getElementById('lista-pro').addEventListener('click', function(e) {
    //   ver que elemento estoy capturando
    const interface = new Interface();
    interface.deleteProcucto(e.target);

})