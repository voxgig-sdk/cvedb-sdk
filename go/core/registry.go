package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCveEntityFunc func(client *CvedbSDK, entopts map[string]any) CvedbEntity

var NewIfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntityFunc func(client *CvedbSDK, entopts map[string]any) CvedbEntity

var NewThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntityFunc func(client *CvedbSDK, entopts map[string]any) CvedbEntity

