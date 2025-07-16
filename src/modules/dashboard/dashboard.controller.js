import dashboardService from '../dashboard/dashboard.service.js'

export const fetchData = async (req, res, next) => {
  try {
    // Récupération en parallèle pour meilleure performance
    const [
      contractStats,
      clientStats,
      paymentStats,
      claimStats,
      chartData,
      upcomingEvents
    ] = await Promise.all([
      dashboardService.getContractStats(),
      dashboardService.getClientStats(),
      dashboardService.getPaymentStats(),
      dashboardService.getClaimStats(),
      dashboardService.getChartData(),
      dashboardService.getUpcomingEvents()
    ]);

    res.json({
      contracts: contractStats,
      clients: clientStats,
      payments: paymentStats,
      claims: claimStats,
      contractData: chartData.contractData,
      paymentData: chartData.paymentData,
      upcomingEvents
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    next(error);
  }
};