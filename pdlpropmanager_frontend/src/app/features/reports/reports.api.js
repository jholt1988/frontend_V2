
import api from '../../utils/axios';

export const fetchReports = () => api.get('/reports/summary');
