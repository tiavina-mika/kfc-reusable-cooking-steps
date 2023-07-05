export const reusableSteps = [
  {
    productionSteps: [
      {
        name: "RS 04",
        description: "RS 4 description",
        kitchenArea: {
          name: "Kitchen 01 mod",
          createdAt: "2022-10-03T13:28:13.048Z",
          updatedAt: "2022-10-06T13:56:49.815Z",
          objectId: "muRmEs79Dk",
          __type: "Object",
          className: "KitchenArea"
        },
        transformation: "UNPACKING",
        machineType: {
          name: "Sauteuse",
          createdAt: "2022-08-18T15:25:25.862Z",
          updatedAt: "2022-08-30T14:05:42.181Z",
          machineModels: [
            {
              __type: "Pointer",
              className: "MachineModels",
              objectId: "PhCUEAHH4S"
            },
            {
              __type: "Pointer",
              className: "MachineModels",
              objectId: "F4NoRaDsjL"
            },
            {
              __type: "Pointer",
              className: "MachineModels",
              objectId: "lXasqWoKBL"
            },
            {
              __type: "Pointer",
              className: "MachineModels",
              objectId: "QFRM0QMojb"
            }
          ],
          objectId: "aDn9P3X2TL",
          __type: "Object",
          className: "MachineTypes"
        },
        machineSetting: "d5",
        stepDuration: 5,
        stepComponents: [
          {
            grossWeight: 0.01,
            cookingMode: null,
            priorSteps: {
              type: "SALABLE_PRODUCT",
              name: "AMANDES TAMARI 40GR TEST",
              supplierArticleId: "",
              supplierName: "110 GRAINES",
              easilysId: "1-148-3087",
              weightPerPortion: 0.04,
              orderUnitWeight: "unite",
              pricePerPortion: 1.3,
              supplier: {
                __type: "Pointer",
                className: "Suppliers",
                objectId: "Gj0hAhHNIS"
              },
              createdAt: "2022-01-10T11:44:38.332Z",
              updatedAt: "2023-02-15T15:01:38.661Z",
              units: {
                order: {
                  unity: {
                    name: "Carton",
                    quantity: 140,
                    unity: 2
                  },
                  weight: 5.6,
                  price: 187.2
                },
                billing: {
                  unity: {
                    name: "Carton",
                    quantity: 140,
                    unity: 2
                  },
                  weight: 5.6,
                  price: 187.2
                },
                stock: {
                  unity: {
                    name: "",
                    quantity: 1,
                    unity: 2
                  },
                  weight: 0.04,
                  price: 1.337
                },
                conversions: [
                  {
                    value: 0.04,
                    type: 2
                  }
                ]
              },
              site: {
                createdAt: "2021-10-22T09:26:37.327Z",
                updatedAt: "2023-02-21T14:47:40.990Z",
                kitchenAreas: [
                  {
                    kitchenArea: {
                      name: "Kitchen 01 mod",
                      createdAt: "2022-10-03T13:28:13.048Z",
                      updatedAt: "2022-10-06T13:56:49.815Z",
                      objectId: "muRmEs79Dk",
                      __type: "Object",
                      className: "KitchenArea"
                    },
                    order: 1,
                    machinesCount: 3
                  },
                  {
                    kitchenArea: {
                      name: "ffefaf",
                      createdAt: "2023-02-21T14:47:27.491Z",
                      updatedAt: "2023-02-21T14:47:27.491Z",
                      objectId: "48AIvqmOq4",
                      __type: "Object",
                      className: "KitchenArea"
                    },
                    order: 2
                  },
                  {
                    kitchenArea: {
                      name: "Test 2",
                      createdAt: "2022-10-03T13:28:13.742Z",
                      updatedAt: "2022-10-03T13:28:13.742Z",
                      objectId: "5TwsE45cjw",
                      __type: "Object",
                      className: "KitchenArea"
                    },
                    order: 3,
                    machinesCount: 0
                  },
                  {
                    kitchenArea: {
                      name: "Kitchen 02",
                      createdAt: "2022-10-03T13:28:13.281Z",
                      updatedAt: "2022-11-07T10:29:10.708Z",
                      objectId: "ZYbxuJSDYI",
                      __type: "Object",
                      className: "KitchenArea"
                    },
                    order: 4,
                    machinesCount: 2
                  }
                ],
                objectId: "UPK3lbT78C",
                __type: "Object",
                className: "Site"
              },
              stockZone: {
                __type: "Pointer",
                className: "StockZone",
                objectId: "ewmEK71A7N"
              },
              isActive: true,
              ean: "",
              pricePerKg: 0,
              productType: "BREAD",
              supplierArticleName: "AMANDES TAMARI 40GR TEST",
              availabilityAtSupplier: true,
              objectId: "IIJWNTVHhX",
              id: "IIJWNTVHhX",
              grossWeight: 0,
              realCost: 0,
              netWeight: 0
            },
            supplierItem: {
              type: "SALABLE_PRODUCT",
              name: "AMANDES TAMARI 40GR TEST",
              supplierArticleId: "",
              supplierName: "110 GRAINES",
              easilysId: "1-148-3087",
              weightPerPortion: 0.04,
              orderUnitWeight: "unite",
              pricePerPortion: 1.3,
              supplier: {
                __type: "Pointer",
                className: "Suppliers",
                objectId: "Gj0hAhHNIS"
              },
              createdAt: "2022-01-10T11:44:38.332Z",
              updatedAt: "2023-02-15T15:01:38.661Z",
              units: {
                order: {
                  unity: {
                    name: "Carton",
                    quantity: 140,
                    unity: 2
                  },
                  weight: 5.6,
                  price: 187.2
                },
                billing: {
                  unity: {
                    name: "Carton",
                    quantity: 140,
                    unity: 2
                  },
                  weight: 5.6,
                  price: 187.2
                },
                stock: {
                  unity: {
                    name: "",
                    quantity: 1,
                    unity: 2
                  },
                  weight: 0.04,
                  price: 1.337
                },
                conversions: [
                  {
                    value: 0.04,
                    type: 2
                  }
                ]
              },
              site: {
                createdAt: "2021-10-22T09:26:37.327Z",
                updatedAt: "2023-02-21T14:47:40.990Z",
                kitchenAreas: [
                  {
                    kitchenArea: {
                      name: "Kitchen 01 mod",
                      createdAt: "2022-10-03T13:28:13.048Z",
                      updatedAt: "2022-10-06T13:56:49.815Z",
                      objectId: "muRmEs79Dk",
                      __type: "Object",
                      className: "KitchenArea"
                    },
                    order: 1,
                    machinesCount: 3
                  },
                  {
                    kitchenArea: {
                      name: "ffefaf",
                      createdAt: "2023-02-21T14:47:27.491Z",
                      updatedAt: "2023-02-21T14:47:27.491Z",
                      objectId: "48AIvqmOq4",
                      __type: "Object",
                      className: "KitchenArea"
                    },
                    order: 2
                  },
                  {
                    kitchenArea: {
                      name: "Test 2",
                      createdAt: "2022-10-03T13:28:13.742Z",
                      updatedAt: "2022-10-03T13:28:13.742Z",
                      objectId: "5TwsE45cjw",
                      __type: "Object",
                      className: "KitchenArea"
                    },
                    order: 3,
                    machinesCount: 0
                  },
                  {
                    kitchenArea: {
                      name: "Kitchen 02",
                      createdAt: "2022-10-03T13:28:13.281Z",
                      updatedAt: "2022-11-07T10:29:10.708Z",
                      objectId: "ZYbxuJSDYI",
                      __type: "Object",
                      className: "KitchenArea"
                    },
                    order: 4,
                    machinesCount: 2
                  }
                ],
                objectId: "UPK3lbT78C",
                __type: "Object",
                className: "Site"
              },
              stockZone: {
                __type: "Pointer",
                className: "StockZone",
                objectId: "ewmEK71A7N"
              },
              isActive: true,
              ean: "",
              pricePerKg: 33.429,
              productType: "BREAD",
              supplierArticleName: "AMANDES TAMARI 40GR TEST",
              availabilityAtSupplier: true,
              objectId: "IIJWNTVHhX",
              __type: "Object",
              className: "SupplierItems"
            },
            transformationMode: null,
            transformRate: 100,
            netWeight: 10
          },
          {
            grossWeight: 0.008,
            cookingMode: null,
            priorSteps: {
              type: "SALABLE_PRODUCT",
              name: "GRANOLA CHOCO ACEROLA 70 GR X 144",
              supplierArticleId: "",
              supplierName: "110 GRAINES",
              easilysId: "1-148-5067",
              weightPerPortion: 0.07,
              orderUnitWeight: "sachet",
              pricePerPortion: 1,
              supplier: {
                __type: "Pointer",
                className: "Suppliers",
                objectId: "Gj0hAhHNIS"
              },
              createdAt: "2022-01-10T11:44:38.333Z",
              updatedAt: "2023-02-15T15:01:43.445Z",
              units: {
                order: {
                  unity: {
                    name: "Carton",
                    quantity: 140,
                    unity: 2
                  },
                  weight: 9.8,
                  price: 10
                },
                billing: {
                  unity: {
                    name: "Carton",
                    quantity: 140,
                    unity: 2
                  },
                  weight: 9.8,
                  price: 10
                },
                stock: {
                  unity: {
                    name: "",
                    quantity: 1,
                    unity: 2
                  },
                  weight: 0.07,
                  price: 0.071
                },
                conversions: [
                  {
                    value: 0.07,
                    type: 2
                  }
                ]
              },
              supplierArticleName: "GRANOLA CHOCO ACEROLA 70 GR X 144",
              site: {
                __type: "Pointer",
                className: "Site",
                objectId: "hNvU2RuAZW"
              },
              stockZone: {
                __type: "Pointer",
                className: "StockZone",
                objectId: "OrNvXeZs56"
              },
              isActive: true,
              ean: "",
              pricePerKg: 0,
              productType: "BREAKFAST",
              subcontractorProductQuantity: 0,
              availabilityAtSupplier: true,
              objectId: "qo5KhUtT1N",
              id: "qo5KhUtT1N",
              grossWeight: 0,
              realCost: 0,
              netWeight: 0
            },
            supplierItem: {
              type: "SALABLE_PRODUCT",
              name: "GRANOLA CHOCO ACEROLA 70 GR X 144",
              supplierArticleId: "",
              supplierName: "110 GRAINES",
              easilysId: "1-148-5067",
              weightPerPortion: 0.07,
              orderUnitWeight: "sachet",
              pricePerPortion: 1,
              supplier: {
                __type: "Pointer",
                className: "Suppliers",
                objectId: "Gj0hAhHNIS"
              },
              createdAt: "2022-01-10T11:44:38.333Z",
              updatedAt: "2023-02-15T15:01:43.445Z",
              units: {
                order: {
                  unity: {
                    name: "Carton",
                    quantity: 140,
                    unity: 2
                  },
                  weight: 9.8,
                  price: 10
                },
                billing: {
                  unity: {
                    name: "Carton",
                    quantity: 140,
                    unity: 2
                  },
                  weight: 9.8,
                  price: 10
                },
                stock: {
                  unity: {
                    name: "",
                    quantity: 1,
                    unity: 2
                  },
                  weight: 0.07,
                  price: 0.071
                },
                conversions: [
                  {
                    value: 0.07,
                    type: 2
                  }
                ]
              },
              supplierArticleName: "GRANOLA CHOCO ACEROLA 70 GR X 144",
              site: {
                __type: "Pointer",
                className: "Site",
                objectId: "hNvU2RuAZW"
              },
              stockZone: {
                __type: "Pointer",
                className: "StockZone",
                objectId: "OrNvXeZs56"
              },
              isActive: true,
              ean: "",
              pricePerKg: 1.02,
              productType: "BREAKFAST",
              subcontractorProductQuantity: 0,
              availabilityAtSupplier: true,
              objectId: "qo5KhUtT1N",
              __type: "Object",
              className: "SupplierItems"
            },
            transformationMode: null,
            transformRate: 100,
            netWeight: 8
          }
        ],
        createdAt: "2023-06-20T12:07:05.185Z",
        updatedAt: "2023-06-20T12:07:05.185Z",
        objectId: "aLcCI6RN0T",
        __type: "Object",
        className: "ProductionStep"
      }
    ],
    name: "RS 04",
    createdAt: "2023-06-20T12:07:05.509Z",
    updatedAt: "2023-06-20T12:07:05.509Z",
    objectId: "ItHtYcP3BZ"
  },
  {
    productionSteps: [
      {
        __type: "Pointer",
        className: "ProductionStep",
        objectId: "YXhCjtSS6a"
      },
      {
        __type: "Pointer",
        className: "ProductionStep",
        objectId: "3ayKaafB9s"
      }
    ],
    name: "TOMATES EN DÉS",
    createdAt: "2023-06-16T15:08:13.117Z",
    updatedAt: "2023-06-16T15:08:13.117Z",
    objectId: "m7iWJd80iN"
  },
  {
    productionSteps: [
      {
        __type: "Pointer",
        className: "ProductionStep",
        objectId: "pHRAIb1QZX"
      },
      {
        __type: "Pointer",
        className: "ProductionStep",
        objectId: "87TuRa7A1e"
      }
    ],
    name: "PS 02-2",
    createdAt: "2023-06-15T09:47:07.293Z",
    updatedAt: "2023-06-15T09:47:07.293Z",
    objectId: "zBuQc4uJ5u"
  },
  {
    productionSteps: [
      {
        __type: "Pointer",
        className: "ProductionStep",
        objectId: "QDVGtBeZM9"
      }
    ],
    name: "MIK S 04",
    createdAt: "2023-06-09T10:15:05.496Z",
    updatedAt: "2023-06-09T10:15:05.496Z",
    objectId: "D5kQpFU9Wm"
  },
  {
    productionSteps: [
      {
        __type: "Pointer",
        className: "ProductionStep",
        objectId: "IgZ60umCIc"
      }
    ],
    name: "STEP 01",
    createdAt: "2023-06-07T07:57:55.290Z",
    updatedAt: "2023-06-07T07:57:55.290Z",
    objectId: "8l2Sa0fomp"
  }
];
