import { useState } from "react";
import { Card, CardContent, Typography, Box, Modal } from "@mui/material";
import { styled } from "@mui/system";

const ScrollerContainer = styled(Box)({
  display: "flex",
  overflow: "hidden",
  whiteSpace: "nowrap",
  justifyContent: "center", // Centers the cards initially
  width: "100%",
  position: "relative",
  "&:hover div": {
    animationPlayState: "paused", // Pause scrolling when hovered
  },
});

const Scroller = styled(Box)(({ cardCount }) => ({
    display: "flex",
    gap: "50px",
    minWidth: "100%",
    transform: `translateX(-${(cardCount * 250) / 2}px)`, // Centers initially
    animation: `scroll 120s linear infinite`,
    "@keyframes scroll": {
      from: { transform: `translateX(-${(cardCount * 250) / 2}px)` },
      to: { transform: "translateX(-100%)" },
    },
  }));

const DashboardCard = styled(Card)({
  minWidth: "200px", // Adjusted for consistent sizing
  height: "85px",
  background: "linear-gradient(192deg, #635BFF, #c05bff)",
  color: "#fff",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 1,
  textAlign: "center",
  boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
  cursor: "pointer",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)", // Slight zoom on hover
  },
});

const DashboardBox = ({ title, value, icon, onClick }) => (
  <DashboardCard  onClick={onClick}>
    <CardContent>
      <Typography variant="body2" sx={{ opacity: 0.8 }}>{title}</Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {value} {icon}
      </Typography>
    </CardContent>
  </DashboardCard>
);

export default function ScrollingDashboard() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const data = [
    { title: "⭐️Most In-Demand Crop⭐️", value: "Avocados", icon: "", details: "5,000 kg needed by Friday!" },
    { title: "💰Highest Paying Crop💰", value: "$3.50/kg", icon: "", details: "Mangoes selling at a premium price this season!" },
    { title: "🚨Urgent Orders🚨", value: "3 Left!", icon: "", details: "These orders expire in 24 hours, act fast!" },
    { title: "📊Your Potential Earnings📊", value: "$1,200", icon: "", details: "Based on your available crops, you can earn this much!" },
    { title: "📈Trending Crop📈", value: "🍍 Pineapples", icon: "", details: "Pineapples are in high demand this week." },
  ];

  // Duplicate items to ensure a seamless scroll
  const scrollingData = [...data, ...data];

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  return (
    <>
      {/* Scrolling Ticker */}
      <ScrollerContainer>
        <Scroller className="overflow-visible py-3">
          {scrollingData.map((item, index) => (
            <DashboardBox key={index} {...item} onClick={() => handleOpen(item)} />
          ))}
        </Scroller>
      </ScrollerContainer>

      {/* Modal for More Info */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "white",
          boxShadow: 24,
          p: 3,
          borderRadius: "10px",
          textAlign: "center",
        }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {selectedItem?.title}
          </Typography>
          <Typography variant="h4" sx={{ color: "#6a11cb", mt: 1 }}>
            {selectedItem?.value} {selectedItem?.icon}
          </Typography>
          <Typography sx={{ mt: 2 }}>{selectedItem?.details}</Typography>
        </Box>
      </Modal>
    </>
  );
}