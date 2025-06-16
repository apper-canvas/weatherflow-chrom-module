import { toast } from 'react-toastify';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const searchSuggestionService = {
  async getAll() {
    try {
      await delay(300);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        Fields: ['Name', 'city_name', 'country', 'coordinates_lat', 'coordinates_lng'],
        PagingInfo: {
          Limit: 50,
          Offset: 0
        }
      };
      
      const response = await apperClient.fetchRecords('search_suggestion', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
      toast.error("Failed to load search suggestions");
      return [];
    }
  },

  async searchByQuery(query) {
    try {
      await delay(300);
      
      if (!query || query.length < 2) {
        return [];
      }
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        Fields: ['Name', 'city_name', 'country', 'coordinates_lat', 'coordinates_lng'],
        where: [
          {
            FieldName: "city_name",
            Operator: "Contains",
            Values: [query]
          }
        ],
        PagingInfo: {
          Limit: 5,
          Offset: 0
        }
      };
      
      const response = await apperClient.fetchRecords('search_suggestion', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error searching cities:", error);
      return [];
    }
  },

  async create(searchSuggestion) {
    try {
      await delay(300);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [{
          Name: searchSuggestion.Name || searchSuggestion.city_name,
          city_name: searchSuggestion.city_name,
          country: searchSuggestion.country,
          coordinates_lat: parseFloat(searchSuggestion.coordinates_lat),
          coordinates_lng: parseFloat(searchSuggestion.coordinates_lng)
        }]
      };
      
      const response = await apperClient.createRecord('search_suggestion', params);
      
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
          toast.success("Search suggestion created successfully");
          return successfulRecords[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating search suggestion:", error);
      toast.error("Failed to create search suggestion");
      throw error;
    }
  }
};