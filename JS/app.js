const shop_content = document.getElementById("shop_content");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getServices = async() => {
    const response = await fetch("data.json");
    const data = await response.json();
    
    data.forEach((service) => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
            <img src="${service.img}">
            <h3>${service.nombre}</h3>
            <p class="price">${service.precio} $</p>
        `;
    
        shop_content.append(content);
    
        let comprar =document.createElement("button")
        comprar.innerText = "Comprar";
        comprar.className = "comprar";
    
        content.append(comprar);
    
        comprar.addEventListener("click", () => {
    
            const repeat = carrito.some((repeatService) => repeatService.id === service.id);
            
            if(repeat){
                carrito.map((serv) => {
                    if(serv.id === service.id){
                        serv.cantidad++;
                    }
                });
            }else{
            carrito.push({
                id: service.id,
                img: service.img,
                nombre: service.nombre,
                precio: service.precio,
                cantidad: service.cantidad,
            });
            saveLocal();
            }
        });
    });
};

getServices();



//set item

const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

//get item

JSON.parse(localStorage.getItem("carrito"));