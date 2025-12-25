'use client';

import { Class } from '@/types';

interface Props {
  classData: Class;
}

export default function ClassCard({ classData }: Props) {
  return (
    <div className="class-card">
      <h3 className="class-card-name">{classData.name}</h3>

      <div className="class-card-stats">
        <div className="class-card-stat">
          <span className="class-card-stat-icon">🎲</span>
          <span className="class-card-stat-label">
            Кость хитов: d{classData.hitDie}
          </span>
        </div>
        <div className="class-card-stat">
          <span className="class-card-stat-icon">⭐</span>
          <span className="class-card-stat-label">{classData.primaryAbility}</span>
        </div>
        <div className="class-card-stat">
          <span className="class-card-stat-icon">🛡️</span>
          <span className="class-card-stat-label">
            {classData.saves.join(', ')}
          </span>
        </div>
      </div>

      <p className="class-card-description">{classData.description}</p>

      <a href={`/classes/${classData.id}`} className="class-card-link">
        Подробнее →
      </a>
    </div>
  );
}