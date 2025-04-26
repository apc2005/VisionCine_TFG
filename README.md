# Proyecto VisionCine

Este proyecto consta de dos partes principales:

- **Backend:** API desarrollada con Laravel (PHP)
- **Frontend:** Aplicación web desarrollada con React (u otro framework JS)

---

## Descripción

VisionCine es una plataforma para gestionar y visualizar información sobre películas, con funcionalidades como autenticación, gestión de favoritos, reseñas, y más.

---

## Requisitos previos

- PHP >= 8.x
- Composer
- Node.js y npm
- Servidor web o entorno de desarrollo local (por ejemplo, Laravel Sail, Valet, XAMPP, etc.)

---

## Configuración del Backend (VisionCine-backend)

1. Navegar a la carpeta del backend:

```bash
cd VisionCine-backend
```

2. Instalar dependencias de PHP con Composer:

```bash
composer install
```

3. Copiar el archivo de configuración de entorno y configurarlo:

```bash
cp .env.example .env
```

Editar `.env` para configurar la base de datos y otros parámetros necesarios.

4. Generar la clave de la aplicación:

```bash
php artisan key:generate
```

5. Ejecutar las migraciones para crear las tablas en la base de datos:

```bash
php artisan migrate
```

6. Configurar CORS para permitir peticiones desde el frontend:

- El archivo `config/cors.php` debe configurarse para permitir solicitudes desde el puerto en el que corre tu proyecto frontend. Para ello, debes añadir el patrón correspondiente en `allowed_origins_patterns`. Por ejemplo, si tu frontend corre en `http://localhost:5179`, añade:

```php
'allowed_origins' => [],
'allowed_origins_patterns' => ['http://localhost:5179'],
```

- Además, el middleware CORS debe estar habilitado en `app/Http/Kernel.php` en el grupo de middleware `api`:

```php
\Fruitcake\Cors\HandleCors::class,
```

7. Iniciar el servidor de desarrollo de Laravel:

```bash
php artisan serve
```

Por defecto, se ejecutará en `http://localhost:8000`.

---

## Configuración del Frontend (VisionCine-FrontEnd)

1. Navegar a la carpeta del frontend:

```bash
cd VisionCine-FrontEnd
```

2. Instalar dependencias de Node.js:

```bash
npm install
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Por defecto, se ejecutará en un puerto como `http://localhost:5173` o similar.

---

## Notas

- Si cambias el puerto en el que corre tu frontend, debes actualizar el patrón en `allowed_origins_patterns` para que coincida con el nuevo puerto.
- Asegúrate de reiniciar el servidor backend después de cualquier cambio en la configuración.

---

