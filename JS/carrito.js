const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito.</h1>
    `;
    modalContainer.append(modalHeader);
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "X";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })

    modalHeader.append(modalbutton);

    carrito.forEach((service) => {
    let carritoContent = document.createElement("div")
    carritoContent.className = "modal-content"
    carritoContent.innerHTML = `
        <img src="${service.img}">
        <h3>${service.nombre}</h3>
        <p>${service.precio} $</p>
        <span class = "Restar"> - </span>
        <p>Cantidad: ${service.cantidad}</p>
        <span class = "Sumar"> + </span>
        <p>Total: ${service.cantidad * service.precio}</p>
        <span class = "delate-service"> ❌ </span>
    `;
    modalContainer.append(carritoContent)

    let restar = carritoContent.querySelector(".Restar");

    restar.addEventListener("click", () => {
        if(service.cantidad !== 1){
        service.cantidad--;
        }
        saveLocal();
        pintarCarrito();
    });

    let sumar = carritoContent.querySelector(".Sumar");

    sumar.addEventListener("click", () => {
        service.cantidad++;
        saveLocal();
        pintarCarrito();
    });

    let eliminar = carritoContent.querySelector(".delate-service");

    eliminar.addEventListener("click", () => {
        eliminarServicio(service.id);
    });
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalbuying = document.createElement("div")
    totalbuying.className = "total-content"
    totalbuying.innerHTML = `Total a pagar: ${total} $`;
    modalContainer.append(totalbuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarServicio = (id) => {
    const foundid = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoid) => {
        return carritoid !== foundid;
    });
    saveLocal();
    pintarCarrito();
};
