import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  buckets: [
    {
      id: nanoid(),
      name: "Entertainment",
      cards: [
        {
          id: nanoid(),
          title: "Nat Geo",
          link: "https://www.youtube.com/embed/myBmq87fJeQ",
        },
      ],
    },
    {
      name: "Songs",
      id: nanoid(),
      cards: [
        {
          id: nanoid(),
          title: "Ed sheeran",
          link: "https://www.youtube.com/embed/u6wOyMUs74I",
        },
        {
          id: nanoid(),
          title: "SANAM",
          link: "https://www.youtube.com/embed/WDT-weEgX3g",
        },
      ],
    },
    {
      id: nanoid(),
      name: "Education",
      cards: [
        {
          id: nanoid(),
          title: "Dhruv Rathi",
          link: "https://www.youtube.com/embed/nw-84LXi7Go",
        },
        {
          id: nanoid(),
          title: "Unacademy",
          link: "https://www.youtube.com/embed/v2X51AVgl3o",
        },
      ],
    },
  ],
};

export const bucketSlice = createSlice({
  name: "buckets",
  initialState,
  reducers: {
    editBucketName: {
      reducer(state, action) {
        const { editedName, id } = action.payload;
        const foundBucket = state.buckets.find((bucket) => bucket.id === id);
        if (foundBucket) {
          foundBucket.name = editedName;
        }
      },
    },
    deleteBucket: {
      reducer(state, action) {
        const { index } = action.payload;
        state.buckets.splice(index, 1);
      },
    },
    addBucket: {
      reducer(state, action) {
        state.buckets.unshift({
          name: "Add a Bucket",
          id: nanoid(),
          cards: [],
          initialEdit: true,
        });
      },
    },
    addCard: {
      reducer(state, action) {
        const { bucketIndex, title, link } = action.payload;
        const newCard = {
          id: nanoid(),
          title,
          link,
        };

        const foundBucket = state.buckets.find(
          (bucket, index) => index === bucketIndex
        );
        foundBucket.cards.unshift(newCard);
      },
    },
    updateCard: {
      reducer(state, action) {
        const { title, link, bucketIndex, cardIndex } = action.payload;
        const foundBucket = state.buckets.find(
          (bucket, index) => index === bucketIndex
        );
        const foundCard = foundBucket.cards[cardIndex];
        foundCard.title = title;
        foundCard.link = link;
      },
    },
    deleteCard: {
      reducer(state, action) {
        const { bucketIndex, cardIndex } = action.payload;
        console.log(action.payload, "deelele");
        state.buckets[bucketIndex].cards.splice(cardIndex, 1);
      },
    },
    toggleInitialEditValue: {
      reducer(state, action) {
        const { index } = action.payload;
        const val = state.buckets[index].initialEdit;
        if (val !== undefined) {
          state.buckets[index].initialEdit = false;
        }
      },
    },
  },
});

export const allBuckets = (state) => state.buckets.buckets;
export const {
  editBucketName,
  addCard,
  updateCard,
  deleteBucket,
  addBucket,
  deleteCard,
  toggleInitialEditValue,
} = bucketSlice.actions;

export default bucketSlice.reducer;
