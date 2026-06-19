const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables from root .env
dotenv.config({ path: path.join(__dirname, '../.env') });

const Note = require('./models/Note');

const seedNotes = [
  {
    title: "Quantum Physics Lecture Notes",
    subject: "Physics",
    description: `Core Principles:
- Quantum mechanics differs from classical physics by describing nature through probabilities and wave functions rather than deterministic trajectories.
- Wave-Particle Duality: Quantum objects (electrons, photons) exhibit both wave-like and particle-like properties, as demonstrated in the double-slit experiment.
- Heisenberg Uncertainty Principle: It is fundamentally impossible to simultaneously measure position and momentum with absolute precision.
- Superposition: A quantum system can exist in multiple states simultaneously until a measurement is made, collapsing the system.
- Entanglement: A phenomenon where two particles become linked so that the state of one instantly influences the other, regardless of distance.

Mathematical Framework:
- Wave Function: An abstract mathematical description of a quantum system. Its square modulus represents probability density.
- Schrödinger Equation: The central equation of quantum mechanics. The time-dependent version describes state evolution, while the time-independent version finds stationary energy states.`,
    userEmail: "seeded@notenest.com",
    downloads: 12,
    rating: 4.8,
  },
  {
    title: "Linear Algebra & Matrices Review",
    subject: "Mathematics",
    description: `Linear algebra is centered on the study of vectors, vector spaces, linear transformations, and systems of linear equations.

Core Concepts:
1. Systems of Linear Equations: Sets of equations involving the same variables, represented as Ax = b. Can be solved using Gaussian elimination to find a unique solution, infinitely many solutions, or none.
2. Vector Spaces: A collection of objects (vectors) that can be added and scaled. Provides a framework for linear combinations, dependence, span, and dimension.
3. Eigenvalues and Eigenvectors: Described by the relationship Av = lambda * v.
   - Eigenvector (v): A non-zero vector whose direction remains unchanged when linear transformation A is applied. It is only stretched, shrunk, or reversed.
   - Eigenvalue (lambda): The scaling factor of the eigenvector.
   - Characteristic Equation: det(A - lambda * I) = 0 is solved to calculate eigenvalues.`,
    userEmail: "seeded@notenest.com",
    downloads: 45,
    rating: 4.9,
  },
  {
    title: "Sociology & Contemporary Culture Study Guide",
    subject: "Social Science",
    description: `Foundational notes on the sociological study of culture and social inequality:

1. Sociology of Culture: Culture refers to the shared "way of life" of a society, which is socially acquired through socialization.
   - Material Culture: Tangible, man-made objects (technology, tools, clothing, art).
   - Non-Material Culture: Intangible elements (values, norms, language, beliefs).
   - Core Elements: Symbols, Language (transmission backbone), Values (moral compass), and Norms (Folkways and Mores).
   - Cultural Lag: Occurs when technology (material) advances faster than values and laws (non-material).

2. Social Stratification & Inequality: Hierarchical division of groups based on wealth, status, power.
   - Types: Inequality of Condition (wealth distribution) and Inequality of Opportunity (access to life chances like education/healthcare).
   - Factors: Intersections of Class, Race/Ethnicity, and Gender.
   - Cultural Capital (Pierre Bourdieu): Non-financial social assets (education, speech, tastes) that promote social mobility.`,
    userEmail: "seeded@notenest.com",
    downloads: 8,
    rating: 4.5,
  },
  {
    title: "Python Data Structures and Algorithms",
    subject: "Computer Science",
    description: `Fundamental CS Structures and Algorithms implemented in Python:

1. Stacks (LIFO - Last-In First-Out):
   - Operations: push(item), pop(), is_empty().
   - Python: Use lists (.append() and .pop()) or collections.deque for optimal O(1) performance.
   - Algorithms: Depth-First Search (DFS), function call stacks, and undo buffers.

2. Queues (FIFO - First-In First-Out):
   - Operations: enqueue(item), dequeue().
   - Python: Use collections.deque with append() and popleft() for O(1) operations. Lists are avoided due to O(n) element shifting on pop(0).
   - Algorithms: Breadth-First Search (BFS), task scheduling, and buffers.

3. Binary Trees (Non-Linear):
   - A tree where each node has at most two children.
   - Binary Search Tree (BST): Left child is smaller, right is larger. Enables O(log n) searches.
   - Traversals: In-order (Left, Root, Right), Pre-order (Root, Left, Right), Post-order (Left, Right, Root).`,
    userEmail: "seeded@notenest.com",
    downloads: 132,
    rating: 5.0,
  }
];

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding...");

    // Delete existing seeded notes to make script idempotent
    await Note.deleteMany({ userEmail: "seeded@notenest.com" });
    console.log("Old seeded notes cleared.");

    // Insert new notes
    await Note.create(seedNotes);
    console.log("Database seeded successfully with sample notes!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

runSeed();
