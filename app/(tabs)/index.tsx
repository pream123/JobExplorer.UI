import JobExplorer from "@/components/JobExplorer";
import { useEffect, useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { TextInput } from "react-native-paper";

interface Job {
  id: string;
  position: string;
  company: string;
  location: string;
  tag?: string[];
}
const PAGE_SIZE = 10;

export default function HomeScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const [page, setPage] = useState(1);

  const window = useWindowDimensions();

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("https://localhost:5093/api/jobExplorer");
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.position.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE);
  const pagedJobs = filteredJobs.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const onNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const onPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <TextInput
          mode="outlined"
          label="Search jobs"
          placeholder="Position or company or location"
          value={search}
          onChangeText={setSearch}
          style={[
            styles.searchInput,
            { width: Math.min(window.width * 0.9, 460) },
          ]}
          dense={true}
        />
      </View>
      <JobExplorer data={filteredJobs} loading={loading} error={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchWrapper: {
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    marginBottom: 10,
  },
});
