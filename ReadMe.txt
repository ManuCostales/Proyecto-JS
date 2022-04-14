 

ISSUE / BUG TRACKER:


Aplicación para gestionar tareas, eventos, y errores, dentro de un ambiente laboral colaborativo en distintos projectos y con diferentes equipos.

SECCIONES / FUNCIONALIDADES:

DASHBOARD:

-Graficos de estadisticas:
	Ventana que tenga opciones: all/project(tal)/Equipo(tal)/Mine
		Tickets by type.
		Tickets by status.
		Tickets by priority.

-Projectos:
	project name.
	host/company.
	creator.
	fecha de creacion.
	notificaciones.
	view.

	GOTO
	SEE MORE
	




Registro de Usuarios: Los usuarios deben registrarse para utilizar la aplicacion y ser agregados a un proyecto.
Los datos a pedir de los usuarios son:

-Nombre y Apellido.
-Rol (en la organizacion/equipo).
-Correo electronico.
-Telefono.
-Contraseña para loguear.



Ventana de Projectos:

-Titulo.
-Organizacion/Lider.
-Descripcion.
-Usuarios.(Opcion de importar usuarios de otro projecto)
-Fecha de creacion.
-Link a repos de Github.



ADMIN:
-Asignar personas al proyecto.
-Renombrar proyecto.
-Eliminar proyecto.

-Tickets del projecto. Usar modals.

-Usuarios dentro del projecto. Usar modals.

-Equipos dentro del projecto. Usar modals.

Una vez dentro del proyecto, se pueden ver los tickets del mismo.
Tambien esta la ventana de equipos.

Equipos: Son opcionales dentro de un proyecto. Se usarian para meter a personas que se 
encarguen de determinadas tareas.



Ventana de equipos:

Muestra los equipos en los que esta metido el usuario.
Tiene que tener opcion para buscar.

Nombre de equipo.
Proyecto asignado.
Cantidad de miembros.
Miembros (nombre, email, telefono).
Chat del equipo. 
Añadir miembro (si sos admin).



Ventana de tickets:

Tickets: Dos tipos, tareas y errores.
Tiene que tener opcion para buscar
(Name,
sort(newest,etc),
type,
open/close)

Tareas: Se refieren a algo nuevo por hacer.

-Titulo.
-Autor.	
-Prioridad.
-Descripcion.
-Tipo.
-Tiempo estimado de resolucion(hs).
-Deadline/Timelimit(Opcional).
-Status.
-Usuarios asignados.
-Comentarios.
-Fecha de creacion.
-Fecha de actualizacion.
-Subir una imagen o documento importante para la tarea.
-Historial de la tarea.

Errores: Se refieren a algun problema con algo ya hecho.

-Titulo.
-Autor.	
-Prioridad.
-Descripcion.
-Tipo.
-Tiempo estimado de resolucion(hs).
-Deadline/Timelimit(Opcional).
-Status.
-Usuarios asignados.
-Comentarios.
-Fecha de creacion.
-Fecha de actualizacion.
-Subir una imagen o documento importante para la tarea.
-Historial de la tarea.



Ventana de Historial:

-Historial de tareas de usuario.
-Historial de tareas de equipo.
-Historial de tareas de projecto.



Ventana de calendario:

Debe mostrar un calendario con eventos y deadlines.


Ventana de perfil de usuario:

Debe permitir personalizar el perfil de usuario.


