# Graph Report - .  (2026-05-02)

## Corpus Check
- Corpus is ~9,954 words - fits in a single context window. You may not need a graph.

## Summary
- 58 nodes · 46 edges · 19 communities detected
- Extraction: 76% EXTRACTED · 24% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]

## God Nodes (most connected - your core abstractions)
1. `useAppState()` - 14 edges
2. `CSS Tokens (shadow-card-md, rounded-[28px])` - 4 edges
3. `App()` - 2 edges
4. `AppRoot()` - 2 edges
5. `getLessonByDay()` - 2 edges
6. `HomeScreen()` - 2 edges
7. `JournalScreen()` - 2 edges
8. `KomunitasScreen()` - 2 edges
9. `MisiScreen()` - 2 edges
10. `ProfileScreen()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `AppRoot()` --calls--> `useAppState()`  [INFERRED]
  src\main.jsx → src\hooks\useAppState.jsx
- `HomeScreen()` --calls--> `useAppState()`  [INFERRED]
  src\pages\HomeScreen.jsx → src\hooks\useAppState.jsx
- `KomunitasScreen()` --calls--> `useAppState()`  [INFERRED]
  src\pages\KomunitasScreen.jsx → src\hooks\useAppState.jsx
- `ProfileScreen()` --calls--> `useAppState()`  [INFERRED]
  src\pages\ProfileScreen.jsx → src\hooks\useAppState.jsx
- `App()` --calls--> `useAppState()`  [INFERRED]
  src\App.jsx → src\hooks\useAppState.jsx

## Communities

### Community 0 - "Community 0"
Cohesion: 0.18
Nodes (12): App(), App Main Component, HomeScreen UI Cards (rounded-[28px]), HomeScreen Page, IndexedDB Storage (idb-keyval), CSS Tokens (shadow-card-md, rounded-[28px]), MateriScreen UI Cards (rounded-[28px]), MisiScreen UI Cards (rounded-[28px]) (+4 more)

### Community 1 - "Community 1"
Cohesion: 0.33
Nodes (2): JournalScreen(), calcXP()

### Community 2 - "Community 2"
Cohesion: 0.4
Nodes (0): 

### Community 3 - "Community 3"
Cohesion: 0.5
Nodes (2): getLessonByDay(), MisiScreen()

### Community 4 - "Community 4"
Cohesion: 0.67
Nodes (0): 

### Community 5 - "Community 5"
Cohesion: 0.67
Nodes (0): 

### Community 6 - "Community 6"
Cohesion: 1.0
Nodes (1): AppRoot()

### Community 7 - "Community 7"
Cohesion: 1.0
Nodes (0): 

### Community 8 - "Community 8"
Cohesion: 1.0
Nodes (0): 

### Community 9 - "Community 9"
Cohesion: 1.0
Nodes (0): 

### Community 10 - "Community 10"
Cohesion: 1.0
Nodes (0): 

### Community 11 - "Community 11"
Cohesion: 1.0
Nodes (1): HomeScreen()

### Community 12 - "Community 12"
Cohesion: 1.0
Nodes (1): KomunitasScreen()

### Community 13 - "Community 13"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Community 14"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Community 15"
Cohesion: 1.0
Nodes (1): ProfileScreen()

### Community 16 - "Community 16"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Community 17"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Community 18"
Cohesion: 1.0
Nodes (1): MateriScreen Page

## Knowledge Gaps
- **7 isolated node(s):** `App Main Component`, `HomeScreen Page`, `MisiScreen Page`, `MateriScreen Page`, `MateriScreen UI Cards (rounded-[28px])` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 6`** (2 nodes): `AppRoot()`, `main.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 7`** (2 nodes): `BottomNavBar()`, `BottomNavBar.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 8`** (2 nodes): `QuotaModal()`, `QuotaModal.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (2 nodes): `TopAppBar.jsx`, `TopAppBar()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (2 nodes): `getPhase()`, `phases.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (2 nodes): `HomeScreen()`, `HomeScreen.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (2 nodes): `KomunitasScreen()`, `KomunitasScreen.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (2 nodes): `MateriScreen()`, `MateriScreen.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (2 nodes): `OnboardingScreen()`, `OnboardingScreen.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 15`** (2 nodes): `ProfileScreen()`, `ProfileScreen.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 16`** (2 nodes): `SOSScreen()`, `SOSScreen.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (1 nodes): `motivations.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (1 nodes): `MateriScreen Page`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAppState()` connect `Community 0` to `Community 5`, `Community 6`, `Community 11`, `Community 12`, `Community 15`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `useAppState()` (e.g. with `App()` and `AppRoot()`) actually correct?**
  _`useAppState()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `CSS Tokens (shadow-card-md, rounded-[28px])` (e.g. with `HomeScreen UI Cards (rounded-[28px])` and `MisiScreen UI Cards (rounded-[28px])`) actually correct?**
  _`CSS Tokens (shadow-card-md, rounded-[28px])` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `App Main Component`, `HomeScreen Page`, `MisiScreen Page` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._