import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ListFilter } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useProductStore } from "@/stores/productStore";

const CatalogFilters: React.FC = () => {
  const {
    search,
    category,
    setSearch,
    setCategory,
    setPriceRange,
    fetchProducts,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const priceRanges = useMemo(
    () => [
      { id: "r1", label: "$0 - $50", range: [0, 50] },
      { id: "r2", label: "$50 - $150", range: [50, 150] },
      { id: "r3", label: "$150 - $300", range: [150, 300] },
      { id: "r4", label: "$300 - $500", range: [300, 500] },
      { id: "r5", label: "$500+", range: [500, 999999] },
    ],
    []
  );

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = useCallback((id: string) => {
    setSelectedFilters((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  useEffect(() => {
    if (selectedFilters.length === 0) {
      setPriceRange(0, 999999);
      fetchProducts();
      return;
    }

    const activeRanges = priceRanges.filter((r) =>
      selectedFilters.includes(r.id)
    );

    const min = Math.min(...activeRanges.map((r) => r.range[0]));
    const max = Math.max(...activeRanges.map((r) => r.range[1]));

    setPriceRange(min, max);
    fetchProducts();
  }, [selectedFilters, priceRanges]);

  return (
    <div className="flex items-center gap-4">
      <div className="max-w-7xl w-full mx-auto py-4 flex items-center gap-6 justify-between">
        <Input
          placeholder="Search products..."
          className=" bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-5">
          <Select
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value=" ">All</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="jewelery">Jewelery</SelectItem>
                <SelectItem value="men's clothing">Men's clothing</SelectItem>
                <SelectItem value="women's clothing">
                  Women's clothing
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="flex items-center gap-2">
                <ListFilter className="w-4 h-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Price Range</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {priceRanges.map((range) => (
                <DropdownMenuCheckboxItem
                  key={range.id}
                  checked={selectedFilters.includes(range.id)}
                  onCheckedChange={() => toggleFilter(range.id)}
                >
                  {range.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default CatalogFilters;
