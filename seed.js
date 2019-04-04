const Product = require('./models/product');
const faker = require('faker');

var data = []

function seedDB(){
    for (let i = 0; i<100; i++){
        let object = {
            name: faker.commerce.productName(),
            category: faker.commerce.department(),
            quantity: faker.random.number(),
            bio: faker.lorem.paragraph(),
            price: faker.random.number(),
            image: faker.random.image(),
            description: faker.lorem.paragraphs(),
            
        }
    
        data.push(object)
        
    }
    Product.remove({}, function(err){
        if(err){
            console.log(err)
        }else{
            console.log('removed succesfully')
        }
    })
    data.forEach(function(seed){
        Product.create(seed, function(err, product){
            if(err){
                console.log(err)
            }else{
                console.log('success')
            }
        })
    })   
}

module.exports = seedDB


