import { makeAutoObservable } from "mobx";
import { Router } from "@vaadin/router";
import { generateRandomId } from "../utils";

class EmployeeStore {
  employees = [
    {
      id: "12341234",
      firstName: "Funky",
      lastName: "User",
      dateOfEmployment: "2024-10-31",
      dateOfBirth: "1990-10-31",
      phone: "905321234213",
      email: "default123@email.com",
      department: "Analytics",
      position: "Junior",
    },
    {
      id: "12341234",
      firstName: "Default",
      lastName: "User",
      dateOfEmployment: "2024-10-31",
      dateOfBirth: "1990-10-31",
      phone: "90532123123123",
      email: "default@email.com",
      department: "Analytics",
      position: "Junior",
    },
    {
      id: "23123213",
      firstName: "Default1",
      lastName: "User",
      dateOfEmployment: "2024-10-31",
      dateOfBirth: "1990-10-31",
      phone: "905321234561",
      email: "default1@email.com",
      department: "Analytics",
      position: "Junior",
    },
    {
      id: "12312",
      firstName: "Default2",
      lastName: "User",
      dateOfEmployment: "2024-10-31",
      dateOfBirth: "1990-10-31",
      phone: "905321234562",
      email: "default2@email.com",
      department: "Analytics",
      position: "Junior",
    },
    {
      id: "1231",
      firstName: "Default3",
      lastName: "User",
      dateOfEmployment: "2024-10-31",
      dateOfBirth: "1990-10-31",
      phone: "905321234563",
      email: "default3@email.com",
      department: "Analytics",
      position: "Junior",
    },
    {
      id: "2313",
      firstName: "Default4",
      lastName: "User",
      dateOfEmployment: "2024-10-31",
      dateOfBirth: "1990-10-31",
      phone: "905321234564",
      email: "default4@email.com",
      department: "Analytics",
      position: "Junior",
    },
    {
      id: "qwe",
      firstName: "Default5",
      lastName: "User",
      dateOfEmployment: "2024-10-31",
      dateOfBirth: "1990-10-31",
      phone: "905321234565",
      email: "default5@email.com",
      department: "Analytics",
      position: "Junior",
    },
    {
      id: "12341234",
      firstName: "Default6",
      lastName: "User",
      dateOfEmployment: "2024-10-31",
      dateOfBirth: "1990-10-31",
      phone: "9053212345676",
      email: "defaul6t@email.com",
      department: "Analytics",
      position: "Junior",
    },
    {
      id: "2313",
      firstName: "Default7",
      lastName: "User",
      dateOfEmployment: "2024-10-31",
      dateOfBirth: "1990-10-31",
      phone: "905321234567",
      email: "default7@email.com",
      department: "Analytics",
      position: "Junior",
    },
    {
      id: "asdas",
      firstName: "Default8",
      lastName: "User",
      dateOfEmployment: "2024-10-31",
      dateOfBirth: "1990-10-31",
      phone: "905321234568",
      email: "default8@email.com",
      department: "Analytics",
      position: "Junior",
    },
    {
      id: "12341234",
      firstName: "Default9",
      lastName: "User",
      dateOfEmployment: "2024-10-31",
      dateOfBirth: "1990-10-31",
      phone: "905321234569",
      email: "default9@email.com",
      department: "Analytics",
      position: "Junior",
    },
    {
      id: "12312213",
      firstName: "Default10",
      lastName: "User",
      dateOfEmployment: "2024-10-31",
      dateOfBirth: "1990-10-31",
      phone: "905321234510",
      email: "default10@email.com",
      department: "Analytics",
      position: "Junior",
    },
    {
      id: "12312312321",
      firstName: "Default11",
      lastName: "User",
      dateOfEmployment: "2024-10-31",
      dateOfBirth: "1990-10-31",
      phone: "905321234511",
      email: "default11@email.com",
      department: "Analytics",
      position: "Junior",
    },
    {
      id: "dadas",
      firstName: "Default12",
      lastName: "User",
      dateOfEmployment: "2024-10-31",
      dateOfBirth: "1990-10-31",
      phone: "905321234512",
      email: "default12@email.com",
      department: "Analytics",
      position: "Junior",
    },
    {
      id: "231314214",
      firstName: "Default13",
      lastName: "User",
      dateOfEmployment: "2024-10-31",
      dateOfBirth: "1990-10-31",
      phone: "905321234514",
      email: "default13@email.com",
      department: "Analytics",
      position: "Junior",
    },
    {
      id: "dasda",
      firstName: "Default14",
      lastName: "User",
      dateOfEmployment: "2024-10-31",
      dateOfBirth: "1990-10-31",
      phone: "905321234514",
      email: "default14@email.com",
      department: "Analytics",
      position: "Junior",
    },
    {
      id: "21323",
      firstName: "Default15",
      lastName: "User",
      dateOfEmployment: "2024-10-31",
      dateOfBirth: "1990-10-31",
      phone: "905321234515",
      email: "default15@email.com",
      department: "Analytics",
      position: "Junior",
    },
    {
      id: "3123",
      firstName: "Default16",
      lastName: "User",
      dateOfEmployment: "2024-10-31",
      dateOfBirth: "1990-10-31",
      phone: "905321234516",
      email: "default16@email.com",
      department: "Analytics",
      position: "Junior",
    },
  ];
  selectedView = "table";
  currentPage = 1;
  itemsPerPage = 10;
  isDeleteModalOpen = false;
  isEditModalOpen = false;
  employee = {
    id: "",
    firstName: "",
    lastName: "",
    dateOfEmployment: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    department: "Analytics",
    position: "Junior",
  };
  searchTerm = "";
  filteredEmployees = this.employees;
  paginatedEmployees = this.employees;
  searchedValue = null;

  constructor() {
    makeAutoObservable(this);

    this.updatePaginatedEmployees();
  }

  resetForm() {
    // Reset form after submission
    this.employee = {
      id: "",
      firstName: "",
      lastName: "",
      dateOfEmployment: "",
      dateOfBirth: "",
      phone: "",
      email: "",
      department: "Analytics",
      position: "Junior",
    };
  }

  //EMPLOYEE LIST
  setEmployees(employees) {
    this.employees = employees;
  }

  toggleView() {
    this.selectedView = this.selectedView === "table" ? "list" : "table";
  }

  setPage(page) {
    this.currentPage = page;
    this.updatePaginatedEmployees();
  }

  initiateDeleteEmployee(value) {
    this.employee = value;
    this.isDeleteModalOpen = true;
  }

  finalizeDeleteEmployee() {
    this.isDeleteModalOpen = false;

    const employeeFoundAndRemoved = employeeStore.employees.filter(
      (e) => e.id !== this.employee.id
    );
    this.setEmployees(employeeFoundAndRemoved);
    this.resetForm();
    this.searchField(this.searchedValue);
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  searchField(value) {
    this.searchedValue = value;

    if (!value) {
      this.filteredEmployees = this.employees;
    } else {
      const searchTerm = value.toLowerCase();

      this.filteredEmployees = this.employees.filter((employee) => {
        return (
          employee.firstName.toLowerCase().includes(searchTerm) ||
          employee.lastName.toLowerCase().includes(searchTerm) ||
          employee.phone.toLowerCase().includes(searchTerm) ||
          employee.email.toLowerCase().includes(searchTerm) ||
          employee.department.toLowerCase().includes(searchTerm) ||
          employee.position.toLowerCase().includes(searchTerm)
        );
      });
    }

    this.updatePaginatedEmployees();
  }

  updatePaginatedEmployees() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEmployees = this.filteredEmployees.slice(
      startIndex,
      endIndex
    );
    this.totalPages = Math.ceil(
      this.filteredEmployees.length / this.itemsPerPage
    );
  }

  //EDIT EMPLOYEE
  updateField(field, value) {
    this.employee[field] = value;
  }

  submitForm() {
    const formattedEmployee = {
      ...this.employee,
      id: generateRandomId(8),
    };

    const existingEmployees = this.employees.filter((employee) => {
      return (
        employee.phone.toLowerCase().includes(formattedEmployee.phone) ||
        employee.email.toLowerCase().includes(formattedEmployee.email)
      );
    });

    if (existingEmployees.length > 0) {
      alert("This user exists");
    } else {
      this.setEmployees([...employeeStore.employees, formattedEmployee]);
      this.resetForm();
      this.searchField(this.searchedValue);
      Router.go("/");
    }
  }

  initiateEditEmployee(value) {
    this.employee = value;
    Router.go(`/edit-employee/`);
  }

  finalizeEditEmployee() {
    const formattedEmployee = {
      ...this.employee,
    };

    const employeeFoundAndRemoved = employeeStore.employees.filter(
      (e) => e.id !== this.employee.id
    );

    const existingEmployees = employeeFoundAndRemoved.filter((employee) => {
      return (
        employee.phone.toLowerCase().includes(formattedEmployee.phone) ||
        employee.email.toLowerCase().includes(formattedEmployee.email)
      );
    });

    if (existingEmployees.length > 0) {
      alert("This user exists");
    } else {
      this.setEmployees([...employeeFoundAndRemoved, formattedEmployee]);
      this.resetForm();
      this.searchField(this.searchedValue);
      Router.go("/");
    }
  }
}

export const employeeStore = new EmployeeStore();
