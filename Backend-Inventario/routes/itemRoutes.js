const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); 

router.post('/', async (req, res) => {
    const { code, name, photo, description, quantity, price } = req.body;
    try {
        // Validar campos requeridos
        if (!code || !name || !description || quantity == null || price == null) {
            return res.status(400).json({ message: 'faltan campos requeridos' });
        }

        if (typeof quantity !== 'number' || typeof price !== 'number') {
            return res.status(400).json({ message: 'escribe numero por favor' });
        }

        const newItem = new Item({ code, name, photo, description, quantity, price });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error('error al crear el articulo:', error);
        res.status(500).json({ message: 'error al crear el articulo', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const items = await Item.find({}, 'code name photo description quantity price');
        res.status(200).json(items);
    } catch (error) {
        console.error('Error al obtener los articulos:', error);
        res.status(500).json({ message: 'Error al obtener los artículos', error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id, 'code name photo description quantity price');
        if (!item) {
            return res.status(404).json({ message: 'Articulo no encontrado' });
        }
        res.status(200).json(item);
    } catch (error) {
        console.error('Error al obtener el artículo:', error);
        res.status(500).json({ message: 'Error al obtener el artículo', error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { code, name, photo, description, quantity, price } = req.body;
    try {
       
        if (!code || !name || !description || quantity == null || price == null) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

   
        if (typeof quantity !== 'number' || typeof price !== 'number') {
            return res.status(400).json({ message: 'Cantidad y precio deben ser numeros' });
        }

        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { code, name, photo, description, quantity, price },
        
            { new: true, runValidators: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Articulo no encontrado' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Error al actualizar el artículo:', error);
        res.status(500).json({ message: 'Error al actualizar el artículo', error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Articulo no encontrado' });
        }
        res.status(200).json({ message: 'Articulo eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el articulo:', error);
        res.status(500).json({ message: 'Error al eliminar el articulo', error: error.message });
    }
});

module.exports = router;
