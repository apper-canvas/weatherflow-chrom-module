import { toast } from 'react-toastify';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const weatherDataService = {
  async getAll() {
    try {
      await delay(300);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        Fields: ['Name', 'location', 'current_temperature', 'current_feels_like', 'current_condition', 'current_icon', 'current_humidity', 'current_wind_speed'],
        PagingInfo: {
          Limit: 50,
          Offset: 0
        }
      };
      
      const response = await apperClient.fetchRecords('weather_data', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast.error("Failed to load weather data");
      return [];
    }
  },

  async getByLocation(location) {
    try {
      await delay(300);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        Fields: ['Name', 'location', 'current_temperature', 'current_feels_like', 'current_condition', 'current_icon', 'current_humidity', 'current_wind_speed'],
        where: [
          {
            FieldName: "location",
            Operator: "Contains",
            Values: [location]
          }
        ],
        PagingInfo: {
          Limit: 1,
          Offset: 0
        }
      };
      
      const response = await apperClient.fetchRecords('weather_data', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.data && response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
      console.error("Error fetching weather data by location:", error);
      return null;
    }
  },

  async create(weatherData) {
    try {
      await delay(300);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [{
          Name: weatherData.Name || weatherData.location,
          location: weatherData.location,
          current_temperature: parseFloat(weatherData.current_temperature),
          current_feels_like: parseFloat(weatherData.current_feels_like),
          current_condition: weatherData.current_condition,
          current_icon: weatherData.current_icon,
          current_humidity: parseInt(weatherData.current_humidity),
          current_wind_speed: parseFloat(weatherData.current_wind_speed)
        }]
      };
      
      const response = await apperClient.createRecord('weather_data', params);
      
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
          toast.success("Weather data created successfully");
          return successfulRecords[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating weather data:", error);
      toast.error("Failed to create weather data");
      throw error;
    }
  },

  async update(id, weatherData) {
    try {
      await delay(300);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [{
          Id: parseInt(id),
          Name: weatherData.Name || weatherData.location,
          location: weatherData.location,
          current_temperature: parseFloat(weatherData.current_temperature),
          current_feels_like: parseFloat(weatherData.current_feels_like),
          current_condition: weatherData.current_condition,
          current_icon: weatherData.current_icon,
          current_humidity: parseInt(weatherData.current_humidity),
          current_wind_speed: parseFloat(weatherData.current_wind_speed)
        }]
      };
      
      const response = await apperClient.updateRecord('weather_data', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          toast.success("Weather data updated successfully");
          return successfulUpdates[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error updating weather data:", error);
      toast.error("Failed to update weather data");
      throw error;
    }
  }
};