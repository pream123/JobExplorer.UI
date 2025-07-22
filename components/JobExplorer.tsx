import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Job {
  id?: string;
  position?: string;
  company: string;
  location: string;
  tag?: string[];
}
interface JobTableProps {
  data: Job[];
  loading: boolean;
  error: string | null;
}

export default function JobExplorer({ data }: JobTableProps) {
  if (!data || data.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <Text>No jobs available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.tableRow, styles.tableHeader]}>
        <Text style={[styles.headerCell, styles.flex3]}>Job Title</Text>
        <Text style={[styles.headerCell, styles.flex2]}>Company</Text>
        <Text style={[styles.headerCell, styles.flex2]}>Location</Text>
      </View>

      {data.map((job, index) => (
        <View
          key={job.id || index}
          style={[
            styles.tableRow,
            index % 2 === 0 ? styles.rowEven : styles.rowOdd,
          ]}
        >
          <Text style={[styles.cell, styles.flex3]}>{job.position}</Text>
          <Text style={[styles.cell, styles.flex2]}>{job.company}</Text>
          <Text style={[styles.cell, styles.flex2]}>{job.location}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 40,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#1976d2",
  },
  headerCell: {
    color: "#fff",
    fontWeight: "bold",
  },
  rowEven: {
    backgroundColor: "#f0f0f0",
  },
  rowOdd: {
    backgroundColor: "#fff",
  },
  cell: {
    fontSize: 14,
  },
  flex3: {
    flex: 3,
  },
  flex2: {
    flex: 2,
  },
});
