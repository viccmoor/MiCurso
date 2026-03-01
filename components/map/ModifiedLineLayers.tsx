import {
	LineLayer,
} from "@maplibre/maplibre-react-native";

export default function ModifiedLineLayers() {
	return (
		<>
			<LineLayer id="road_trunk_primary" style={{ lineColor: "#ffffff" }} />
			<LineLayer id="road_trunk_primary_casing" style={{ lineColor: "#cfcdca" }} />

			<LineLayer id="road_secondary_tertiary" style={{ lineColor: "#ffffff" }} />
			<LineLayer id="road_secondary_tertiary_casing" style={{ lineColor: "#cfcdca" }} />

			<LineLayer id="road_motorway" style={{ lineColor: "#ffffff" }} />
			<LineLayer id="road_motorway_casing" style={{ lineColor: "#cfcdca" }} />

			<LineLayer id="tunnel_motorway" style={{ lineColor: "#ffffff" }} />
			<LineLayer id="tunnel_motorway_casing" style={{ lineColor: "#cfcdca" }} />

			<LineLayer id="tunnel_motorway_link" style={{ lineColor: "#ffffff" }} />
			<LineLayer id="tunnel_motorway_link_casing" style={{ lineColor: "#cfcdca" }} />

			<LineLayer id="tunnel_link" style={{ lineColor: "#ffffff" }} />
			<LineLayer id="tunnel_link_casing" style={{ lineColor: "#cfcdca" }} />

			<LineLayer id="tunnel_trunk_primary" style={{ lineColor: "#ffffff" }} />
			<LineLayer id="tunnel_trunk_primary_casing" style={{ lineColor: "#cfcdca" }} />

			<LineLayer id="road_motorway_link" style={{ lineColor: "#ffffff" }} />
			<LineLayer id="road_motorway_link_casing" style={{ lineColor: "#cfcdca" }} />

			<LineLayer id="bridge_trunk_primary" style={{ lineColor: "#ffffff" }} />
			<LineLayer id="bridge_trunk_primary_casing" style={{ lineColor: "#cfcdca" }} />

			<LineLayer id="bridge_motorway" style={{ lineColor: "#ffffff" }} />
			<LineLayer id="bridge_motorway_casing" style={{ lineColor: "#cfcdca" }} />

			<LineLayer id="bridge_motorway_link" style={{ lineColor: "#ffffff" }} />
			<LineLayer id="bridge_motorway_link_casing" style={{ lineColor: "#cfcdca" }} />

			<LineLayer id="bridge_secondary_tertiary" style={{ lineColor: "#ffffff" }} />
			<LineLayer id="bridge_secondary_tertiary_casing" style={{ lineColor: "#cfcdca" }} />
		</>
	);
}