"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import {
  FaUserCheck,
  FaUserSlash,
  FaUserShield,
  FaFilter,
  FaSearch,
} from "react-icons/fa";
import Animate from "@/components/reusable/Animate";
import { updateUserStatus } from "@/server/user.service";
import { showToast } from "@/components/reusable/toastAlert";
import Pagination from "@/components/shared/Pagination";

const AllUsersTable = ({ users, currentUser }) => {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // filter users
  const filteredUsers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !searchValue ||
        user.name?.toLowerCase().includes(searchValue) ||
        user.email?.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  // pagination
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  const handleStatus = async (userId, status, name) => {
    const result = await Swal.fire({
      title: status === "blocked" ? "Block this user?" : "Activate this user?",
      text:
        status === "blocked"
          ? `${name} won't be able to access the platform.`
          : `${name} will regain access to the platform.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === "blocked" ? "#dc2626" : "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: status === "blocked" ? "Block" : "Activate",
    });

    if (!result.isConfirmed) return;

    try {
      setLoadingId(userId);
      const res = await updateUserStatus(userId, status);
      if (res.success) {
        showToast("success", res.message);
        router.refresh();
      } else {
        showToast("error", res.message);
      }
    } catch (error) {
      showToast("error", res.message);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-accent" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full rounded-xl border border-accent/20 bg-base-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <FaFilter className="text-sm text-accent" />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-sm rounded-xl border-accent/20 bg-base-200 text-sm focus:border-primary focus:outline-none"
          >
            <option value="all">All Users</option>

            <option value="active">Active</option>

            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Result information */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-accent">
          Showing{" "}
          <span className="font-medium text-base-content">
            {filteredUsers.length}
          </span>{" "}
          {filteredUsers.length === 1 ? "user" : "users"}
        </p>

        {(search || statusFilter !== "all") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
            }}
            className="text-xs text-primary cursor-pointer"
          >
            Clear filters
          </button>
        )}
      </div>
      {paginatedUsers.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-sm font-semibold text-accent">No users found.</p>
        </div>
      ) : (
        <Animate className="overflow-x-auto rounded-xl shadow border-x border-accent">
          <table className="table table-zebra">
            <thead className="bg-base-100 text-primary">
              <tr>
                <th>No</th>
                <th>User</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedUsers?.map((user, index) => {
                const isCurrentUser = currentUser.id === user._id;

                return (
                  <tr key={user._id}>
                    <td>{index + 1}</td>

                    <td>
                      <div className="flex items-center gap-3">
                        <Image
                          src={user.image}
                          alt={user.name}
                          width={45}
                          height={45}
                          className="rounded-full"
                        />

                        <div>
                          <p className="font-semibold">{user.name}</p>

                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div>
                        <p>{user.contact || "N/A"}</p>
                        <p className="text-xs text-gray-500">
                          NID: {user.nid || "N/A"}
                        </p>
                      </div>
                    </td>

                    <td>
                      {user.role === "admin" ? (
                        <span className="badge badge-primary gap-1">
                          <FaUserShield />
                          Admin
                        </span>
                      ) : (
                        <span className="badge badge-outline px-7">User</span>
                      )}
                    </td>

                    <td>
                      {user.status === "active" ? (
                        <span className="badge badge-success text-white">
                          Active
                        </span>
                      ) : (
                        <span className="badge badge-error text-white">
                          Blocked
                        </span>
                      )}
                    </td>

                    <td>
                      {new Date(user.createdAt).toLocaleDateString("en-BD", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="text-center">
                      {isCurrentUser ? (
                        <button className="btn btn-disabled btn-xs" disabled>
                          Your Account
                        </button>
                      ) : user.status === "active" ? (
                        <button
                          onClick={() =>
                            handleStatus(user._id, "blocked", user.name)
                          }
                          disabled={loadingId === user._id}
                          className="btn btn-error btn-xs gap-2 text-white rounded-lg px-4"
                        >
                          <FaUserSlash />
                          {loadingId === user._id ? "..." : "Block"}
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleStatus(user._id, "active", user.name)
                          }
                          disabled={loadingId === user._id}
                          className="btn btn-success btn-xs gap-2 text-white rounded-lg"
                        >
                          <FaUserCheck />
                          {loadingId === user._id ? "..." : "Activate"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Animate>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default AllUsersTable;
