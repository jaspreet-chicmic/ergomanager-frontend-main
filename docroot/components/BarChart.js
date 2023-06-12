import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const BarChart = ({ data }) => {
  const categories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const ms = (m, s) => {
    const month = data.filter((item) => item.fieldData["dueDate"].startsWith(m));
    return month.filter((item) => item.fieldData["status"].includes(s))
      .length;
  };

  console.log(
    "check",
    data.filter((item) => item.fieldData["status"].includes("Σε Εκκρεμότητα"))
  );

  // const closedData = [20,15,20,15,20,15,10,25,15,10,25,15]
  // const doneData = [10,25,15,10,25,15,20,10,30,15,25,20]
  // const openData = [20,10,30,15,25,20,20,15,20,15,20,15]

  const closedData = [
    ms("01", "Κλειστό"),
    ms("02", "Κλειστό"),
    ms("03", "Κλειστό"),
    ms("04", "Κλειστό"),
    ms("05", "Κλειστό"),
    ms("06", "Κλειστό"),
    ms("07", "Κλειστό"),
    ms("08", "Κλειστό"),
    ms("09", "Κλειστό"),
    ms("10", "Κλειστό"),
    ms("11", "Κλειστό"),
    ms("12", "Κλειστό"),
  ];
  const doneData = [
    ms("01", "Υλοποιήθηκε"),
    ms("02", "Υλοποιήθηκε"),
    ms("03", "Υλοποιήθηκε"),
    ms("04", "Υλοποιήθηκε"),
    ms("05", "Υλοποιήθηκε"),
    ms("06", "Υλοποιήθηκε"),
    ms("07", "Υλοποιήθηκε"),
    ms("08", "Υλοποιήθηκε"),
    ms("09", "Υλοποιήθηκε"),
    ms("10", "Υλοποιήθηκε"),
    ms("11", "Υλοποιήθηκε"),
    ms("12", "Υλοποιήθηκε"),
  ];
  const openData = [
    ms("01", "Σε Εκκρεμότητα"),
    ms("02", "Σε Εκκρεμότητα"),
    ms("03", "Σε Εκκρεμότητα"),
    ms("04", "Σε Εκκρεμότητα"),
    ms("05", "Σε Εκκρεμότητα"),
    ms("06", "Σε Εκκρεμότητα"),
    ms("07", "Σε Εκκρεμότητα"),
    ms("08", "Σε Εκκρεμότητα"),
    ms("09", "Σε Εκκρεμότητα"),
    ms("10", "Σε Εκκρεμότητα"),
    ms("11", "Σε Εκκρεμότητα"),
    ms("12", "Σε Εκκρεμότητα"),
  ];

  return (
    <div>
      <Chart
        type="bar"
        // width={100%}
        height={300}
        series={[
          {
            name: `Closed`,
            data: closedData,
            color: "#22C348",
          },
          {
            name: `Done`,
            data: doneData,
            color: "#F8C51B",
          },
          {
            name: `Open`,
            data: openData,
            color: "#CC0905",
          },
        ]}
        options={{
          chart: {
            stacked: true,
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            tickPlacement: "on",
            categories: categories,
          },
          dataLabels: {
            enabled: false,
          },
          tooltip: {
            y: {
              formatter: function (value, opts) {
                let percent =
                  opts.w.globals.seriesPercent[opts.seriesIndex][
                    opts.dataPointIndex
                  ];
                return percent.toFixed(0) + "%";
              },
            },
          },
        }}
      ></Chart>
    </div>
  );
};

export default BarChart;
