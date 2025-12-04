# Tecnolíderes Landing Page

Landing page para la comunidad Tecnolíderes, que conecta niños y adolescentes con profesionales de tecnología a través de mentorías y eventos.

[![GitHub Pages](https://img.shields.io/badge/demo-live-brightgreen)](https://solhecoo.github.io/tecnolideres-landing/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## Demo

**[Ver sitio en vivo](https://solhecoo.github.io/tecnolideres-landing/)**

## Tecnologías

- **HTML5** - Estructura semántica
- **Tailwind CSS** (CDN) - Framework de estilos
- **AOS.js** - Animaciones al scroll
- **Google Apps Script** - Integración con Google Sheets

## Estructura del Proyecto

```
tecnolideres-landing/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos personalizados
├── js/
│   └── main.js         # JavaScript para interactividad
├── assets/
│   └── images/         # Imágenes del proyecto
└── README.md
```

## Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/solhecoo/tecnolideres-landing.git

# Entrar al directorio
cd tecnolideres-landing

# Iniciar servidor local
python3 -m http.server 3000

# Abrir en el navegador
open http://localhost:3000
```

---

## Contribuir

¡Gracias por tu interés en contribuir a Tecnolíderes! Todas las contribuciones son bienvenidas.

### Formas de Contribuir

- Reportar bugs
- Sugerir nuevas funcionalidades
- Mejorar documentación
- Enviar pull requests con mejoras

### Guía Rápida

1. **Fork** el repositorio
2. **Clona** tu fork:
   ```bash
   git clone https://github.com/TU_USUARIO/tecnolideres-landing.git
   ```
3. **Crea una rama** para tu feature:
   ```bash
   git checkout -b feature/mi-nueva-funcionalidad
   ```
4. **Realiza tus cambios** y haz commit:
   ```bash
   git add .
   git commit -m "feat: agregar nueva funcionalidad"
   ```
5. **Push** a tu fork:
   ```bash
   git push origin feature/mi-nueva-funcionalidad
   ```
6. Abre un **Pull Request**

### Convención de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

| Tipo | Descripción |
|------|-------------|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `docs:` | Cambios en documentación |
| `style:` | Cambios de formato (no afectan código) |
| `refactor:` | Refactorización de código |
| `test:` | Agregar o modificar tests |
| `chore:` | Tareas de mantenimiento |

**Ejemplos:**
```bash
git commit -m "feat: agregar sección de testimonios"
git commit -m "fix: corregir formulario en móviles"
git commit -m "docs: actualizar instrucciones de instalación"
```

### Reportar Bugs

Abre un [Issue](https://github.com/solhecoo/tecnolideres-landing/issues/new) con:

- Descripción clara del problema
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Capturas de pantalla (si aplica)
- Navegador y sistema operativo

### Sugerir Funcionalidades

Abre un [Issue](https://github.com/solhecoo/tecnolideres-landing/issues/new) con:

- Descripción de la funcionalidad
- Caso de uso / problema que resuelve
- Mockups o ejemplos (opcional)

### Estilo de Código

- Usar **2 espacios** para indentación
- Nombres de clases en **inglés**
- Comentarios en **español**
- Seguir convenciones de Tailwind CSS

### Pull Request Checklist

Antes de enviar tu PR, verifica:

- [ ] El código funciona localmente
- [ ] Es responsive (funciona en móvil y desktop)
- [ ] No hay errores en la consola
- [ ] Los commits siguen la convención
- [ ] La descripción del PR es clara

---

## Configuración de Google Sheets

El formulario envía datos a Google Sheets. Para configurarlo:

1. Crea una hoja en [Google Sheets](https://sheets.google.com)
2. Ve a **Extensiones > Apps Script**
3. Pega el código del script (ver documentación completa)
4. Despliega como aplicación web
5. Actualiza la URL en `js/main.js`

---

## Personalización

### Colores

Modifica en `index.html`:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'electric-blue': '#3B82F6',
                'vibrant-purple': '#8B5CF6',
                'bright-cyan': '#06B6D4',
                'energy-orange': '#F97316',
                'dark-gray': '#1F2937',
            }
        }
    }
}
```

### Estadísticas

Busca los elementos `counter` en `index.html`:

```html
<div class="counter" data-target="500">0</div>
```

---

## Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

## Contacto

- **Sitio web:** [solhecoo.github.io/tecnolideres-landing](https://solhecoo.github.io/tecnolideres-landing/)
- **Issues:** [github.com/solhecoo/tecnolideres-landing/issues](https://github.com/solhecoo/tecnolideres-landing/issues)

---

Hecho con ❤️ para el futuro de Latinoamérica
