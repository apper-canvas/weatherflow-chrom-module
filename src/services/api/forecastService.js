import { toast } from 'react-toastify';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const forecastService = {
  async getAll() {
    try {
      await delay(300);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        Fields: ['Name', 'weather_data_id', 'date', 'temp_high', 'temp_low', 'condition', 'icon', 'precipitation'],
        PagingInfo: {
          Limit: 50,
          Offset: 0
        }
      };
      
      const response = await apperClient.fetchRecords('forecast', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      toast.error("Failed to load forecast data");
      return [];
    }
  },

  async getByWeatherDataId(weatherDataId) {
    try {
      await delay(300);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        Fields: ['Name', 'weather_data_id', 'date', 'temp_high', 'temp_low', 'condition', 'icon', 'precipitation'],
        where: [
          {
            FieldName: "weather_data_id",
            Operator: "ExactMatch",
            Values: [parseInt(weatherDataId)]
          }
        ],
        orderBy: [
          {
            FieldName: "date",
            SortType: "ASC"
          }
        ],
        PagingInfo: {
          Limit: 10,
          Offset: 0
        }
      };
      
      const response = await apperClient.fetchRecords('forecast', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching forecast by weather data ID:", error);
      return [];
    }
  },

  async create(forecast) {
    try {
      await delay(300);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [{
          Name: forecast.Name || `${forecast.condition} - ${forecast.date}`,
          weather_data_id: parseInt(forecast.weather_data_id),
          date: forecast.date,
          temp_high: parseFloat(forecast.temp_high),
          temp_low: parseFloat(forecast.temp_low),
          condition: forecast.condition,
          icon: forecast.icon,
          precipitation: parseInt(forecast.precipitation)
        }]
      };
      
      const response = await apperClient.createRecord('forecast', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          toast.success("Forecast created successfully");
          return successfulRecords[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating forecast:", error);
      toast.error("Failed to create forecast");
      throw error;
    }
  }
};