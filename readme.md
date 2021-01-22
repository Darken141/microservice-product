# Product microsevice REST API

set-up in ```../docker-compose.yml```

```yml
  product-service:
    restart: always
    build: ./product-service
    command: npm run develop
    environment:
      - MONGO_URI=mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@mongodb:27017/${MONGO_INITDB_DATABASE}
    ports: 
      - 9001:3000
    links: 
      - mongodb
    volumes: 
      - product_modules:/app/node_modules
    networks:
      - local
    depends_on: 
      - mongodb
```

and at the end

```yml
    volumes:
      product_modules:
```

Default product model in ```./config.js```

```js
const productPropertiesArr= ['name', 'description', 'image', 'eshop', 'price', 'soldAmount', 'available']

const productModel = {
    name:{
        type:String
    },
    description:{
        type:String
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Image'
    },
    dateCreated:{
        type: Date,
        default: Date.now
    },
    eshop: {
        type: Boolean
    },
    price: {
        type: Number
    },
    soldAmount: {
        type: Number,
        default: 0
    },
    available: {
        type: Number,
        default: 0
    }
}
```

routes:

- GET ```/products``` - return all images.
- POST ```/products``` - create product refernce.
- DELETE ```/products/:id``` - delete single product.
