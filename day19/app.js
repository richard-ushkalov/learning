import { renderPage } from './render.js';

const players = [
  { id: 'p1', name: 'Аня', team: 'красные', potted: 8, fouls: 3, isActive: true },
  { id: 'p2', name: 'Борис', team: 'красные', potted: 8, fouls: 1, isActive: true },
  { id: 'p3', name: 'Вера', team: 'синие', potted: 3, fouls: 2, isActive: true },
  { id: 'p4', name: 'Глеб', team: 'синие', potted: 5, fouls: 0, isActive: false },
  { id: 'p5', name: 'Дина', team: 'зелёные', potted: 0, fouls: 4, isActive: true },
];

renderPage(players);