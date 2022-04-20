SPACETRACKIT 

IssueTracker / TaskList simple-------------------------------------------------------------------------------------------

Consiste en un sistema de usuarios, proyectos, equipos, y tareas. 

USUARIOS: Se debe loguear o registrar para ser guardado como usuario. Un usuario puede crear proyectos, equipos y tareas.
Para crear equipos y tareas el usuario debe tener el rol de ADMIN del proyecto.

PROYECTOS: Agrupan una cantidad de personas (miembros) bajo un mismo nombre, para realizar distintas tareas. A su vez, un proyecto puede estar tambien dividido en equipos.
Entre las caracteristicas que posee un proyecto se encuentran los "roles" que pueden ser asignados a usuarios. Los roles pueden ser creados por el usuario.
El rol mas importante y comun a todos los proyectos es el de "ADMIN", el cual permite a un usuario tener control total sobre el proyecto (manejar equipos y tareas y poder eliminarlo).

EQUIPOS: Son grupos de miembros del proyecto, creados para realizar tareas en especifico.

ISSUES/TAREAS: Son tareas a realizar para el proyecto. Si el usuario pertenece al proyecto, puede asignarse a si mismo a la tarea.
A su vez, al momento de creacion de la tarea, se puede especificar si se quiere asignar la tarea a un equipo. Esto lo que hace es asignar directamente a todos los miembros del equipo a la tarea.

La lista de tareas de la pagina "issues" da la posibilidad de elegir entre AVAILABLE (muestra las tareas en las cuales el usuario no esta asignado) y TAKEN (muestra las tareas en las cuales el usuario ya esta asignado).




FUNCIONAMIENTO PASO POR PASO (Teniendo en cuenta que el programa funcione bien):-------------------------------------------------------------------------------------------------------------

1-Abrir el archivo index.html

2.1 El programa deberia enviarlo al Login.
2.2 Debido a que no esta registrado, debe registrarse por primera vez (clickear en Sign In).
2.3 Rellenar los datos y registrarse. Una vez registrado, loguear.

3.1 Una vez dentro, es recomendable desloguear (con el boton de encendido que aparece en la barra de navegacion superior, al lado del nombre de usuario). Esto seria para crear otro nuevo usuario para poder usar bien la app.
3.2 Una vez deslogueado, crear otro nuevo usuario y loguear nuevamente.
3.3 Ahora si, ya es posible dirigirse a la ventana de "projects" y crear un nuevo proyecto. Seleccionar la card de "New Project" o el boton de "New".
3.4 Rellenar los campos y crear el proyecto.

4.1 Una vez creado el proyecto, en la pestaña de "projects" deberia aparecer una card y una fila con la informacion del proyecto recien creado.
4.2 Usar los botones de la card "open" o el de seleccion de la fila "See Full Info" para ver la informacion total del proyecto.

5.1 Una vez que tenemos un proyecto o somos parte de uno, podemos empezar a crear equipos e issues o asignarnos a nosotros mismos a estos ultimos.

6.1 La dinamica de creacion y visualización para equipos y tareas funciona de manera muy similar a la de los proyectos.
6.2 Basicamente para cada uno de estos objetos, existe una pagina de visualizacion del total (con cards y listas), una pagina de creación para cada uno, y una pagina de visualizacion de cada objeto en particular.
6.3 Por ultimo el dashboard muestra de forma resumida, informacion de los tres.

7.1 Recordar que para cambiar de usuario o crear mas usuarios (para simular una base de datos real) se debe desloguear con el boton de "encendido/apagado" junto al nombre de usuario en la barra superior



FUNCIONALIDADES A TERMINAR:--------------------------------------------------------------------------------------------------------------------------------------------------------------- 

* Sistema de notificaciones (los botones naranjas con un 2, se referirian a las notificaciones del proyecto/equipo/tarea.

* Search input de la barra de navegacion superior.

* Propiedad de Last Entry: Deberia mostrar la ultima fecha/hora en la cual el proyecto/equipo/tarea fue modificado.

* Sistemas de botones de "View" de Dashboard y modales de cada objeto. Los botones de view todavia no redirigen al objeto indicado.



PROBLEMAS CON VISUALIZACION/CSS:------------------------------------------------------------------------------------------------------------------------------------------------------------

*Los botones de redireccion y otros objetos cuya funcion es de uso, NO poseen la propiedad HOVER, es decir que los botones no muestran un indicio de que pueden ser clickeados.

*El proyecto fue realizado en un monitor de 24´´(pulgadas) con una resolución de 1920x1080. Debido a falta de tiempo no se pudo realizar el escalado/responsive del proyecto para pantallas mas pequeñas o grandes.
Es recomendable tratar de visualizar el proyecto en un monitor lo mas cercano al que fue realizado. Si no es posible, tener en cuenta que quiza el proyecto no se visualize bien.
