import Contrat from "../contrat/contrat.model.js";
import Personne from "../Personne/personne.model.js";
import Paiement from "../paiement/paiement.model.js";
import Sinistre from "../sinistre/sinistre.model.js";
import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns'; // <- ajoute format ici
import sequelize from '../../config/database.js';  // ton instance Sequelize
import { Op } from 'sequelize'

class DashboardService {
  // Statistiques des contrats
  async getContractStats() {
    const now = new Date();
    const startOfCurrentMonth = startOfMonth(now);
    const endOfCurrentMonth = endOfMonth(now);
    const startOfLastMonth = startOfMonth(subMonths(now, 1));
    const endOfLastMonth = endOfMonth(subMonths(now, 1));

    const totalContracts = await Contrat.count();
    const monthlyContracts = await Contrat.count({
      where: {
        dateEffet: {
          [Op.between]: [startOfCurrentMonth, endOfCurrentMonth]
        }
      }
    });

    const lastMonthContracts = await Contrat.count({
      where: {
        dateEffet: {
          [Op.between]: [startOfLastMonth, endOfLastMonth]
        }
      }
    });

    const change = lastMonthContracts > 0 
      ? Math.round(((monthlyContracts - lastMonthContracts) / lastMonthContracts) * 100)
      : 0;

    return {
      total: totalContracts,
      monthly: monthlyContracts,
      trend: monthlyContracts >= lastMonthContracts ? 'up' : 'down',
      change: Math.abs(change)
    };
  }

  // Statistiques des clients
  async getClientStats() {
    const now = new Date();
    const startOfCurrentMonth = startOfMonth(now);
    const endOfCurrentMonth = endOfMonth(now);

    const totalClients = await Personne.count();
    const monthlyClients = await Personne.count({
      where: {
        createdAt: {
          [Op.between]: [startOfCurrentMonth, endOfCurrentMonth]
        }
      }
    });

    return {
      total: totalClients,
      monthly: monthlyClients,
      trend: 'up', // Simplifié pour l'exemple
      change: 8 // À calculer comme pour les contrats
    };
  }

  // Statistiques des paiements
  async getPaymentStats() {
    const now = new Date();
    const startOfCurrentMonth = startOfMonth(now);
    const endOfCurrentMonth = endOfMonth(now);

    const totalPayments = await Paiement.sum('depositAmount');
    const monthlyPayments = await Paiement.sum('depositAmount', {
      where: {
        transactionDate: {
          [Op.between]: [startOfCurrentMonth, endOfCurrentMonth]
        }
      }
    });

    return {
      total: totalPayments || 0,
      monthly: monthlyPayments || 0,
      trend: 'up',
      change: 15 // À calculer
    };
  }

  // Statistiques des sinistres
  async getClaimStats() {
    const totalClaims = await Sinistre.count();
    const monthlyClaims = await Sinistre.count({
      where: {
        dateSinistre: {
          [Op.between]: [startOfMonth(new Date()), endOfMonth(new Date())]
        }
      }
    });

    return {
      total: totalClaims,
      monthly: monthlyClaims,
      trend: 'down',
      change: 3 // À calculer
    };
  }

  // Données pour les graphiques
  async getChartData() {
    // Contrats des 6 derniers mois
    const contractData = await Contrat.findAll({
      attributes: [
        [sequelize.fn('date_trunc', 'month', sequelize.cast(sequelize.col('dateEffet'), 'timestamp')), 'month'], // alias "month"
        [sequelize.fn('count', sequelize.col('id')), 'count']
      ],
      where: {
        dateEffet: {
          [Op.gte]: subMonths(new Date(), 6)
        }
      },
      group: ['month'],
      order: [['month', 'ASC']],
      raw: true
    });

    // Paiements des 6 derniers mois
    const paymentData = await Paiement.findAll({
      attributes: [
        [sequelize.fn('date_trunc', 'month', sequelize.col('transactionDate')), 'month'],
        [sequelize.fn('sum', sequelize.col('depositAmount')), 'total']
      ],
      where: {
        transactionDate: {
          [Op.gte]: subMonths(new Date(), 6)
        }
      },
      group: ['month'],
      order: [['month', 'ASC']],
      raw: true
    });

    return {
      contractData: contractData.map(item => ({
        name: format(new Date(item.month), 'MMM'),
        value: item.count
      })),
      paymentData: paymentData.map(item => ({
        name: format(new Date(item.month), 'MMM'),
        value: item.total
      }))
    };
  }

  // Événements à venir (exemple simplifié)
  async getUpcomingEvents() {
    return [
      {
        id: 1,
        title: 'Réunion équipe',
        date: '2025-07-20',
        time: '10:00'
      },
        {
        id: 2,
        title: 'Revue mensuelle',
        date: '2025-07-25',
        time: '14:30'
      },   {
        id: 3,
        title: 'Formation produits',
        date: '2025-08-05',
        time: '09:00'
      },
    ];
  }
}

export default new DashboardService();