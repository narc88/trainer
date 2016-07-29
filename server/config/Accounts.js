// first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
    service: "facebook"
}); 
ServiceConfiguration.configurations.insert({
  service: "facebook",
  appId: "102861153488122",
  secret: "e7f0de903063e0a48f8790466d2a834f"
});

// first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
    service: "twitter"
}); 
ServiceConfiguration.configurations.insert({
  service: "twitter",
  consumerKey: "yourConsumerKey",
  secret: "yourSecret"
});

// first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
    service: "google"
}); 
ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "yourClientId",
  secret: "yourSecret"
});