<script setup>

const items = [
  {
    id: 1,
    category: "Automotive",
    subCategory: [
      {
        id: 11,
        name: "Engine Fundamentals",
        image: "engine-fundamentals.png",
        glbFile: "",
        blendFile: "",
      },
      {
        id: 12,
        name: "Can Bus System",
        image: "can-bus-system.png",
        glbFile: "",
        blendFile: "",
      },
      {
        id: 13,
        name: "Charging System Alternator",
        image: "charging-system-alternator.png",
        glbFile: "",
        blendFile: "",
      },
      {
        id: 14,
        name: "2 Stroke Diesel Engine Cycle",
        image: "2-stroke-diesel-engine-cycle.png",
        glbFile: "",
        blendFile: "",
      },
      {
        id: 15,
        name: "2 Stroke Petrol Engine Cycle",
        image: "2-stroke-petrol-engine-cycle.png",
        glbFile: "",
        blendFile: "",
      },
    ],
  },
  {
    id: 2,
    category: "Electrical",
    subCategory: [
      {
        id: 21,
        name: "AC Asyncronous Generator",
        image: "ac-syncronous-generator.png",
        glbFile: "",
        blendFile: "",
      },
      {
        id: 22,
        name: "Analog Multimeter",
        image: "analog-multimeter.png",
        glbFile: "",
        blendFile: "",
      },
      {
        id: 23,
        name: "Commercial Mechanical Switches",
        image: "commercial-mechanical-switches.png",
        glbFile: "",
        blendFile: "",
      },
      {
        id: 24,
        name: "DC Generator",
        image: "dc-generator.png",
        glbFile: "",
        blendFile: "",
      },
      {
        id: 25,
        name: "DC Motors",
        image: "dc-motors.png",
        glbFile: "",
        blendFile: "",
      },
    ],
  }, {
    id: 3,
    category: "Refrigeration Air Conditioning",
    subCategory: [
      {
        id: 31,
        name: "Accummulator",
        image: "accumulator.png",
        glbFile: "",
        blendFile: "",
      },
      {
        id: 32,
        name: "Air Distribution Ducting",
        image: "air-distribution-ducting.png",
        glbFile: "",
        blendFile: "",
      },
      {
        id: 33,
        name: "Air Handling Unit",
        image: "air-handling-unit.png",
        glbFile: "",
        blendFile: "",
      },
      {
        id: 34,
        name: "Automatic Expansion Valve (AXV)",
        image: "automatic-expansion-valve.png",
        glbFile: "",
        blendFile: "",
      },
      {
        id: 35,
        name: "Basic Automotive Air Condioner System",
        image: "basic-automotive-air-conditioner-system.png",
        glbFile: "",
        blendFile: "",
      },
    ],
  },
];

const search = ref("");
const filteredRows = computed(() => {
  if (!search.value) {
    return items;
  }

  const matchingItems = items.filter((item) => {
    return (
      item.category.toLowerCase().includes(search.value.toLowerCase()) ||
      item.subCategory.some((subCategoryItem) =>
        subCategoryItem.name.toLowerCase().includes(search.value.toLowerCase())
      )
    );
  });

  return matchingItems;
});

const subCategory = items.reduce((accumulator, item) => {
  return accumulator.concat(item.subCategory);
}, []);

</script>

<template>
  <div class="w-full my-10 mx-10 drop-shadow-xl rounded-l-xl">
    <div class="h-full">
      <div class="h-full">
        <div class="w-full sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4">
          <DashboardCard :items="subCategory" />
        </div>
      </div>
    </div>
  </div>
</template>
