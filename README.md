# Tecnolíderes Landing Page

Landing page para la comunidad Tecnolíderes, que conecta niños y adolescentes con profesionales de tecnología a través de mentorías y eventos.

## Estructura del Proyecto

```
tecnolideres-landing/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos personalizados
├── js/
│   └── main.js         # JavaScript para interactividad
├── assets/
│   └── images/         # Imágenes (agregar aquí)
└── README.md           # Este archivo
```

## Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **Tailwind CSS** (CDN) - Framework de estilos
- **AOS.js** - Animaciones al scroll
- **Google Apps Script** - Integración con Google Sheets

## Configuración de Google Sheets

### Paso 1: Crear la hoja de cálculo

1. Ve a [Google Sheets](https://sheets.google.com) y crea una nueva hoja
2. En la primera fila, agrega estos encabezados:
   - A1: `Timestamp`
   - B1: `Nombre`
   - C1: `Email`
   - D1: `Teléfono`
   - E1: `Tipo Organización`
   - F1: `Tipo Voluntariado`
   - G1: `Mensaje`

### Paso 2: Crear el Apps Script

1. En tu hoja de Google, ve a **Extensiones > Apps Script**
2. Elimina el código existente y pega lo siguiente:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.phone,
      data.orgType,
      data.volunteerTypes.join(', '),
      data.message
    ]);

    // Enviar email de notificación (opcional)
    MailApp.sendEmail({
      to: 'TU_EMAIL@gmail.com',
      subject: 'Nuevo voluntario - Tecnolíderes',
      body: `
        Nuevo registro de voluntario:

        Nombre: ${data.name}
        Email: ${data.email}
        Teléfono: ${data.phone}
        Tipo de Organización: ${data.orgType}
        Intereses: ${data.volunteerTypes.join(', ')}
        Mensaje: ${data.message}
      `
    });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Guarda el proyecto (Ctrl+S)
4. Haz clic en **Implementar > Nueva implementación**
5. Selecciona tipo: **Aplicación web**
6. Configura:
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
7. Haz clic en **Implementar**
8. Copia la URL del web app

### Paso 3: Conectar con la landing page

1. Abre `js/main.js`
2. Busca la línea: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';`
3. Reemplaza `YOUR_GOOGLE_APPS_SCRIPT_URL` con tu URL de Apps Script
4. Descomenta el bloque de fetch (líneas ~150-160)

## Deploy en GitHub Pages

### Opción 1: Desde la interfaz de GitHub

1. Crea un nuevo repositorio en GitHub llamado `tecnolideres-landing`
2. Sube todos los archivos del proyecto
3. Ve a **Settings > Pages**
4. En "Source", selecciona **Deploy from a branch**
5. Selecciona la rama `main` y carpeta `/ (root)`
6. Haz clic en **Save**
7. Tu sitio estará disponible en: `https://TU_USUARIO.github.io/tecnolideres-landing`

### Opción 2: Desde la terminal

```bash
# Inicializar repositorio
cd tecnolideres-landing
git init
git add .
git commit -m "Initial commit - Tecnolíderes landing page"

# Conectar con GitHub
git remote add origin https://github.com/TU_USUARIO/tecnolideres-landing.git
git branch -M main
git push -u origin main
```

## Personalización

### Cambiar colores

Los colores están definidos en el `<head>` de `index.html`:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'electric-blue': '#3B82F6',    // Color primario
                'vibrant-purple': '#8B5CF6',   // Acentos
                'bright-cyan': '#06B6D4',      // Highlights
                'energy-orange': '#F97316',    // CTAs secundarios
                'dark-gray': '#1F2937',        // Textos
            }
        }
    }
}
```

### Agregar imágenes

1. Coloca tus imágenes en la carpeta `assets/images/`
2. Reemplaza los placeholders de logos en la sección de aliados
3. Agrega fotos reales en los testimonios

### Actualizar estadísticas

Busca en `index.html` los elementos con clase `counter` y modifica el atributo `data-target`:

```html
<div class="counter" data-target="500">0</div>
```

### Cambiar textos

Todos los textos están directamente en `index.html`. Busca y reemplaza según necesites.

## Soporte

Si tienes preguntas sobre la implementación, contacta a la comunidad Tecnolíderes.

---

Hecho con ❤️ para el futuro de Latinoamérica
