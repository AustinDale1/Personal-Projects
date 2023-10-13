using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UltimateStatsWebApp.Data.Migrations
{
    /// <inheritdoc />
    public partial class MaxLengthOnNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Stats",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "GameNumber",
                table: "Stats",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OpponentScore",
                table: "Stats",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TeamScore",
                table: "Stats",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Stats");

            migrationBuilder.DropColumn(
                name: "GameNumber",
                table: "Stats");

            migrationBuilder.DropColumn(
                name: "OpponentScore",
                table: "Stats");

            migrationBuilder.DropColumn(
                name: "TeamScore",
                table: "Stats");
        }
    }
}
