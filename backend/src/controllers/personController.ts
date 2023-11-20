import Person from '../models/personModel';

export default {
    create: async (req, res) => {
        try {
          const newPerson = new Person(req.body);
          const savedPerson = await newPerson.save();
          res.status(201).json(savedPerson);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
   };
  