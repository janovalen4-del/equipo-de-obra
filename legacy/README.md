# Equipo de Obra — Landing page

Landing page responsive para un negocio de construcción y refacciones. Proyecto de demostración desarrollado con HTML, CSS y JavaScript vanilla.

## Funcionalidades

- Navegación responsive con menú móvil accesible.
- Secciones de presentación, servicios, proceso, galería ilustrativa, preguntas frecuentes y contacto.
- Formulario con validación HTML que prepara una consulta para WhatsApp.
- Enlaces de consulta por servicio.
- Año del footer actualizado automáticamente.
- Estilos responsive, foco visible y soporte para `prefers-reduced-motion`.

## Ejecutar localmente

1. Descargá o cloná el repositorio.
2. Abrí la carpeta en VS Code.
3. Abrí `index.html` con Live Server o directamente en el navegador.

No requiere instalación de paquetes ni proceso de compilación.

## Configurar WhatsApp

En `script.js`, completá la constante `WHATSAPP_NUMBER` con el número real y autorizado del negocio en formato internacional, sin `+`, espacios ni guiones. Por ejemplo, un número argentino podría tener un formato como `54911XXXXXXXX` (reemplazá las X por los dígitos reales).

Hasta configurarlo, los enlaces desplazan al usuario al contacto y el formulario explica que la integración no está activa. El formulario no almacena datos ni los envía a un servidor.

## Antes de publicar para un negocio real

- Reemplazar nombre, servicios, zonas, horarios y datos de contacto por información verificada.
- Configurar el número de WhatsApp autorizado.
- Confirmar las afirmaciones comerciales (garantías, experiencia, plazos, etc.) antes de agregarlas.
- Reemplazar las fotos ilustrativas por imágenes propias o con licencia adecuada. Las imágenes actuales se cargan desde Unsplash y requieren conexión a internet.
- Si se necesita recibir consultas sin abrir WhatsApp, conectar el formulario a un backend o servicio de formularios y añadir la información de privacidad correspondiente.

## Nota para portfolio

Este repositorio es una muestra de diseño y desarrollo web. La galería usa fotografías ilustrativas; no deben presentarse como obras reales propias. Adaptá los datos antes de ofrecer la web a un cliente.
