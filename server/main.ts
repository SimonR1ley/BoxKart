import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { InventoryModel } from './models/inventory';
import { UsersModel } from './models/users';
import { Part } from './models/part';
import { Build, BuildModel } from './models/builds';

dotenv.config();

const app: Express = express();

//middleware
app.use(cors()); //avoid cors error
app.use(express.json()); //get our params from body

const port = process.env.PORT || 3000;
const clusterUrl = process.env.CLUSTER;
//establish our mongodb connection
mongoose.set('strictQuery', false);

mongoose
  .connect(clusterUrl!)
  .then(() => {
    console.log('mongodb connected successfully');
  })
  .catch((error) => {
    console.log(error.message);
  });

//declare my var

// -------------------------------------------------------------------------------------------------------

// User Routes

app.get('/api/getuser', async (req, res) => {
  const user = await UsersModel.find({});
  res.send(user);
});

app.post('/api/adduser', async (req, res) => {
  const { username, name, surname, email, password } = req.body;
  const user = await UsersModel.create({
    username,
    name,
    surname,
    email,
    password,
  });
  res.send(user);
});

app.put('/api/updateuser/:id', async (req, res) => {
  const id = req.params;
  const { qty } = req.body;
  const user = await UsersModel.findByIdAndUpdate(id, { qty }, { new: true });
  res.send(user);
});

app.put('/api/deleteuser/:id', async (req, res) => {
  const id = req.params;
  const user = await UsersModel.findByIdAndDelete(id);
  res.send(user);
});

// -------------------------------------------------------------------------------------------------------

// Item Routes
app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.get('/api/getinventory', async (req, res) => {
  const inventory = await InventoryModel.find({});
  res.send(inventory);
});

app.post('/api/addinventory', async (req, res) => {
  const { name, type, image, qtySA, qtyUSA, qtyAus, qtyGarage, modelLink } =
    req.body;
  const inventory = await InventoryModel.create({
    name,
    type,
    image,
    qtySA,
    qtyUSA,
    qtyAus,
    qtyGarage,
    modelLink,
  });
  res.send(inventory);
});

app.put('/api/updatesa/:id', async (req, res) => {
  const { id } = req.params;
  const { qtySA } = req.body;
  const inventory = await InventoryModel.findByIdAndUpdate(
    id,
    { qtySA },
    { new: true }
  );
  res.send(inventory);
});

app.put('/api/updateusa/:id', async (req, res) => {
  const { id } = req.params;
  const { qtyUSA } = req.body;
  const inventory = await InventoryModel.findByIdAndUpdate(
    id,
    { qtyUSA },
    { new: true }
  );
  res.send(inventory);
});

app.put('/api/updateaus/:id', async (req, res) => {
  const { id } = req.params;
  const { qtyAus } = req.body;
  const inventory = await InventoryModel.findByIdAndUpdate(
    id,
    { qtyAus },
    { new: true }
  );
  res.send(inventory);
});

app.put('/api/updategarage/:id', async (req, res) => {
  const { id } = req.params;
  const { qtyGarage } = req.body;
  const { userId } = req.body;
  const inventory = await InventoryModel.findByIdAndUpdate(
    id,
    { qtyGarage, userId },
    { new: true }
  );
  res.send(inventory);
});

app.put('/api/deleteinventory/:id', async (req, res) => {
  const id = req.params;
  const inventory = await InventoryModel.findByIdAndDelete(id);
  res.send(inventory);
});

// Build Handeling
app.post('/builds/create', async (req, res) => {
  const buildData = [
    {
      buildNumber: 1,
      buildName: 'Box & Saw',
      image: '../../../assets/BuildImages/boxsaw.png',
      buildModel: '../../../assets/models/boxsaw.gltf',
      amount: 0,
      parts: [
        { partId: '6438b4bda571c54e518f686b', amountNeeded: 2 },
        { partId: '6438b59fa571c54e5190d00d', amountNeeded: 3 },
      ],
    },
    {
      buildNumber: 2,
      buildName: 'Coffin & Saw',
      image: '../../../assets/BuildImages/coffinsaw.png',
      buildModel: '../../../assets/models/coffinsaw.gltf',
      amount: 0,
      parts: [
        { partId: '6438b4f5a571c54e518fb7d8', amountNeeded: 4 },
        { partId: '6438b59fa571c54e5190d00d', amountNeeded: 6 },
      ],
    },
    {
      buildNumber: 3,
      buildName: 'Fridge & Saw',
      image: '../../../assets/BuildImages/fridgesaw.png',
      buildModel: '../../../assets/models/fridgesaw.gltf',
      amount: 0,
      parts: [
        { partId: '6438b512a571c54e518fe089', amountNeeded: 1 },
        { partId: '6438b59fa571c54e5190d00d', amountNeeded: 3 },
      ],
    },
    {
      buildNumber: 4,
      buildName: 'Bath & Saw',
      image: '../../../assets/BuildImages/bathsaw.png',
      buildModel: '../../../assets/models/bathsaw.gltf',
      amount: 0,
      parts: [
        { partId: '6438b574a571c54e51907b25', amountNeeded: 1 },
        { partId: '6438b59fa571c54e5190d00d', amountNeeded: 5 },
      ],
    },

    {
      buildNumber: 5,
      buildName: 'Box & Cheese',
      image: '../../../assets/BuildImages/boxcheese.png',
      buildModel: '../../../assets/models/boxcheese.gltf',
      amount: 0,
      parts: [
        { partId: '6438b4bda571c54e518f686b', amountNeeded: 3 },
        { partId: '6438b5d5a571c54e51912fba', amountNeeded: 4 },
      ],
    },
    {
      buildNumber: 6,
      buildName: 'Coffin & Cheese',
      image: '../../../assets/BuildImages/coffincheese.png',
      buildModel: '../../../assets/models/coffincheese.gltf',
      amount: 0,
      parts: [
        { partId: '6438b4f5a571c54e518fb7d8', amountNeeded: 2 },
        { partId: '6438b5d5a571c54e51912fba', amountNeeded: 6 },
      ],
    },
    {
      buildNumber: 7,
      buildName: 'Fridge & Cheese',
      image: '../../../assets/BuildImages/fridgecheese.png',
      buildModel: '../../../assets/models/fridgecheese.gltf',
      amount: 0,
      parts: [
        { partId: '6438b512a571c54e518fe089', amountNeeded: 2 },
        { partId: '6438b5d5a571c54e51912fba', amountNeeded: 8 },
      ],
    },
    {
      buildNumber: 8,
      buildName: 'Bath & Cheese',
      image: '../../../assets/BuildImages/bathcheese.png',
      buildModel: '../../../assets/models/bathcheese.gltf',
      amount: 0,
      parts: [
        { partId: '6438b574a571c54e51907b25', amountNeeded: 3 },
        { partId: '6438b5d5a571c54e51912fba', amountNeeded: 3 },
      ],
    },

    {
      buildNumber: 9,
      buildName: 'Box & Wagon',
      image: '../../../assets/BuildImages/boxwagon.png',
      buildModel: '../../../assets/models/boxwagon.gltf',
      amount: 0,
      parts: [
        { partId: '6438b4bda571c54e518f686b', amountNeeded: 6 },
        { partId: '6438b626a571c54e5191abd3', amountNeeded: 3 },
      ],
    },
    {
      buildNumber: 10,
      buildName: 'Coffin & Wagon',
      image: '../../../assets/BuildImages/coffinwagon.png',
      buildModel: '../../../assets/models/coffinwagon.gltf',
      amount: 0,
      parts: [
        { partId: '6438b4f5a571c54e518fb7d8', amountNeeded: 4 },
        { partId: '6438b626a571c54e5191abd3', amountNeeded: 8 },
      ],
    },
    {
      buildNumber: 11,
      buildName: 'Fridge & Wagon',
      image: '../../../assets/BuildImages/fridgewagon.png',
      buildModel: '../../../assets/models/fridgewagon.gltf',
      amount: 0,
      parts: [
        { partId: '6438b512a571c54e518fe089', amountNeeded: 1 },
        { partId: '6438b626a571c54e5191abd3', amountNeeded: 9 },
      ],
    },
    {
      buildNumber: 12,
      buildName: 'Bath & Wagon',
      image: '../../../assets/BuildImages/bathwagon.png',
      buildModel: '../../../assets/models/bathwagon.gltf',
      amount: 0,
      parts: [
        { partId: '6438b574a571c54e51907b25', amountNeeded: 3 },
        { partId: '6438b626a571c54e5191abd3', amountNeeded: 3 },
      ],
    },

    {
      buildNumber: 13,
      buildName: 'Box & Doughnut',
      image: '../../../assets/BuildImages/boxdoughnut.png',
      buildModel: '../../../assets/models/boxdoughnut.gltf',

      amount: 0,
      parts: [
        { partId: '6438b4bda571c54e518f686b', amountNeeded: 4 },
        { partId: '6438b603a571c54e519177c4', amountNeeded: 6 },
      ],
    },
    {
      buildNumber: 14,
      buildName: 'Coffin & Doughnut',
      image: '../../../assets/BuildImages/coffindoughnut.png',
      buildModel: '../../../assets/models/coffindoughnut.gltf',
      amount: 0,
      parts: [
        { partId: '6438b4f5a571c54e518fb7d8', amountNeeded: 3 },
        { partId: '6438b603a571c54e519177c4', amountNeeded: 7 },
      ],
    },
    {
      buildNumber: 15,
      buildName: 'Fridge & Doughnut',
      image: '../../../assets/BuildImages/fridgedoughnut.png',
      buildModel: '../../../assets/models/fridgedoughnut.gltf',
      amount: 0,
      parts: [
        { partId: '6438b512a571c54e518fe089', amountNeeded: 2 },
        { partId: '6438b603a571c54e519177c4', amountNeeded: 6 },
      ],
    },
    {
      buildNumber: 16,
      buildName: 'Bath & Doughnut',
      image: '../../../assets/BuildImages/bathdoughnut.png',
      buildModel: '../../../assets/models/bathdoughnut.gltf',
      amount: 0,
      parts: [
        { partId: '6438b574a571c54e51907b25', amountNeeded: 1 },
        { partId: '6438b603a571c54e519177c4', amountNeeded: 4 },
      ],
    },

    {
      buildNumber: 17,
      buildName: 'Box & Record',
      image: '../../../assets/BuildImages/boxrecord.png',
      buildModel: '../../../assets/models/boxrecord.gltf',

      amount: 0,
      parts: [
        { partId: '6438b4bda571c54e518f686b', amountNeeded: 4 },
        { partId: '6438b657a571c54e5191f8b0', amountNeeded: 12 },
      ],
    },
    {
      buildNumber: 18,
      buildName: 'Coffin & Record',
      image: '../../../assets/BuildImages/coffinrecord.png',
      buildModel: '../../../assets/models/coffinrecord.gltf',
      amount: 0,
      parts: [
        { partId: '6438b4f5a571c54e518fb7d8', amountNeeded: 2 },
        { partId: '6438b657a571c54e5191f8b0', amountNeeded: 14 },
      ],
    },
    {
      buildNumber: 19,
      buildName: 'Fridge & Record',
      image: '../../../assets/BuildImages/fridgerecord.png',
      buildModel: '../../../assets/models/fridgerecord.gltf',
      amount: 0,
      parts: [
        { partId: '6438b512a571c54e518fe089', amountNeeded: 1 },
        { partId: '6438b657a571c54e5191f8b0', amountNeeded: 8 },
      ],
    },
    {
      buildNumber: 20,
      buildName: 'Bath & Record',
      image: '../../../assets/BuildImages/bathrecord.png',
      buildModel: '../../../assets/models/bathrecord.gltf',
      amount: 0,
      parts: [
        { partId: '6438b574a571c54e51907b25', amountNeeded: 2 },
        { partId: '6438b657a571c54e5191f8b0', amountNeeded: 6 },
      ],
    },

    {
      buildNumber: 21,
      buildName: 'Box & Stone',
      image: '../../../assets/BuildImages/boxstone.png',
      buildModel: '../../../assets/models/boxstone.gltf',

      amount: 0,
      parts: [
        { partId: '6438b4bda571c54e518f686b', amountNeeded: 2 },
        { partId: '6438b5bba571c54e51910360', amountNeeded: 3 },
      ],
    },
    {
      buildNumber: 22,
      buildName: 'Coffin & Stone',
      image: '../../../assets/BuildImages/coffinstone.png',
      buildModel: '../../../assets/models/coffinstone.gltf',
      amount: 0,
      parts: [
        { partId: '6438b4f5a571c54e518fb7d8', amountNeeded: 1 },
        { partId: '6438b5bba571c54e51910360', amountNeeded: 3 },
      ],
    },
    {
      buildNumber: 23,
      buildName: 'Fridge & Stone',
      image: '../../../assets/BuildImages/fridgestone.png',
      buildModel: '../../../assets/models/fridgestone.gltf',
      amount: 0,
      parts: [
        { partId: '6438b512a571c54e518fe089', amountNeeded: 1 },
        { partId: '6438b5bba571c54e51910360', amountNeeded: 6 },
      ],
    },
    {
      buildNumber: 24,
      buildName: 'Bath & Stone',
      image: '../../../assets/BuildImages/bathstone.png',
      buildModel: '../../../assets/models/bathstone.gltf',
      amount: 0,
      parts: [
        { partId: '6438b574a571c54e51907b25', amountNeeded: 2 },
        { partId: '6438b5bba571c54e51910360', amountNeeded: 7 },
      ],
    },
  ];

  for (const build of buildData) {
    await BuildModel.create(build);
  }

  res.send({ successs: true });
});

// Get my builds
app.get('/builds', async (req, res) => {
  try {
    const builds = await BuildModel.find().populate('parts.partId').exec();

    const buildsWithAvailability = await Promise.all(
      builds.map(async (build) => {
        const parts = build.parts;
        let craftable = true;

        for (const part of parts!) {
          const inventory = await InventoryModel.findById(part.partId).exec();
          const amount = inventory!.qtyGarage;

          if (!amount || amount < part.amountNeeded!) {
            craftable = false;
            break;
          }
        }

        return { ...build.toObject(), craftable };
      })
    );

    res.send(buildsWithAvailability);
  } catch (err) {
    console.log(err);
    // res.status
  }
});

app.post('/builds/craft', async (req, res) => {
  try {
    const { buildId } = req.body;
    const build = await BuildModel.findById(buildId).exec();

    if (build) {
      build.amount!++;
      build.save();
      const parts = build.parts!
      for (const part of parts) {
        const partId = part.partId;
        const inventory = await InventoryModel.findById(partId).exec();
        if (inventory) {
          inventory.qtyGarage! -= part.amountNeeded!
          await inventory.save()
        }
      }
    }
    res.send({ success: true });

  } catch (err) {
    console.log(err);
  }
});

// Server

app.listen(port, () => {
  console.log('[server]: running on port: ' + port);
});

// -------------------------------------------------------------------------------------------------------
