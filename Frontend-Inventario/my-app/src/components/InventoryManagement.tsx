import { useState, useEffect } from 'react'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'

interface InventoryItem {
  id: string
  code: string
  name: string
  photo: string
  description: string
  quantity: number
  price: number
}

export default function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [currentItem, setCurrentItem] = useState<InventoryItem>({
    id: '',
    code: '',
    name: '',
    photo: '',
    description: '',
    quantity: 0,
    price: 0
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const dummyData: InventoryItem[] = [
      {
        id: '1',
        code: 'CPU001',
        name: 'Procesador Intel i7',
        photo: 'https://m.media-amazon.com/images/I/71VnezirXPL.jpg',
        description: 'Procesador de alta gama para gaming y trabajo pesado',
        quantity: 10,
        price: 299.99
      },
      {
        id: '2',
        code: 'GPU001',
        name: 'NVIDIA RTX 3080',
        photo: 'https://m.media-amazon.com/images/I/71fRdbDbzHS._AC_UF894,1000_QL80_.jpg',
        description: 'Tarjeta grafica de ultima generacion',
        quantity: 5,
        price: 699.99
      }
    ]
    setInventory(dummyData)
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentItem) {
      if (isEditing) {
        setInventory(inventory.map(item => item.id === currentItem.id ? currentItem : item))
      } else {
        setInventory([...inventory, { ...currentItem, id: Date.now().toString() }])
      }
      resetForm()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentItem(prev => ({ ...prev, [name]: name === 'quantity' || name === 'price' ? parseFloat(value) : value }))
  }

  const handleEdit = (item: InventoryItem) => {
    setCurrentItem(item)
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    setInventory(inventory.filter(item => item.id !== id))
  }

  const resetForm = () => {
    setCurrentItem({
      id: '',
      code: '',
      name: '',
      photo: '',
      description: '',
      quantity: 0,
      price: 0
    })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Gestion de Inventario</h1>
        
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Editar Articulo' : 'Agregar Nuevo Articulo'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="code"
              placeholder="Codigo"
              value={currentItem.code}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Nombre del articulo"
              value={currentItem.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              required
            />
            <input
              type="text"
              name="photo"
              placeholder="URL de la imagen"
              value={currentItem.photo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              required
            />
            <textarea
              name="description"
              placeholder="Descripcion"
              value={currentItem.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              required
            ></textarea>
            <input
              type="number"
              name="quantity"
              placeholder="Cantidad disponible"
              value={currentItem.quantity || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Precio"
              step="0.01"
              value={currentItem.price || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              required
            />
          </div>

          {currentItem.photo && (
            <div className="mt-4 flex justify-center">
              <img src={currentItem.photo} alt={currentItem.name} className="h-32 w-32 object-cover rounded-md" />
            </div>
          )}

          {currentItem.name && (
            <div className="mt-2 text-center text-lg font-semibold text-gray-800">
              {currentItem.name}
            </div>
          )}

          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            {isEditing ? 'Actualizar Articulo' : 'Agregar Articulo'}
          </button>
        </form>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Codigo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripcion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <img src={item.photo} alt={item.name} className="h-20 w-20 object-cover rounded-md" />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2 bg-gray-100 p-2 rounded">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-500"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

