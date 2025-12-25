import mongoose from 'mongoose';
import { connectDB } from '../config/database';
import Spell from '../models/Spell';
import Class from '../models/Class';
import Race from '../models/Race';
import { spellsData, classesData, racesData } from './seedData';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dnd';

const seedDatabase = async () => {
  try {
    // Подключаемся к базе данных
    await connectDB();
    
    console.log('🚀 Начало заполнения базы данных...');
    
    // Очищаем коллекции (опционально)
    await Spell.deleteMany({});
    await Class.deleteMany({});
    await Race.deleteMany({});
    
    console.log('🗑️ Существующие данные удалены');
    
    // Заполняем коллекции
    const spells = await Spell.insertMany(spellsData);
    console.log(`✅ Добавлено ${spells.length} заклинаний`);
    
    const classes = await Class.insertMany(classesData);
    console.log(`✅ Добавлено ${classes.length} классов`);
    
    const races = await Race.insertMany(racesData);
    console.log(`✅ Добавлено ${races.length} рас`);
    
    console.log('🎉 База данных успешно заполнена!');
    
    // Отключаемся от базы данных
    
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка при заполнении базы данных:', error);
    process.exit(1);
  }
};

// Запускаем скрипт
seedDatabase();